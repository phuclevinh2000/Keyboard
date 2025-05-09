use std::collections::HashMap;
use std::sync::LazyLock;
use trie_rs::Trie;
use trie_rs::TrieBuilder;

/// A prefix search is based on a prefix tree implementation from third-party library `trie-rs`,
/// which is supposed to ensure a fast word lookup (the performance aspect is not actually tested though).
/// And an exact search is based on a simple hashmap lookup.
pub struct Dictionary {
    trie: Trie<u8>,
    codes_to_words: HashMap<String, Vec<&'static str>>,
}

pub fn create_dictionary(words: Vec<&'static str>) -> Result<Dictionary, String> {
    let mut codes_to_words = HashMap::new();
    let mut trie_builder = TrieBuilder::new();
    for word in words.into_iter() {
        let t9_code = word_to_t9_code(&word)?;

        let value_ref = codes_to_words.entry(t9_code.clone()).or_insert(vec![]);
        value_ref.push(word);

        trie_builder.push(t9_code);
    }

    Ok(Dictionary {
        trie: trie_builder.build(),
        codes_to_words,
    })
}
pub fn word_to_t9_code(w: &str) -> Result<String, String> {
    w.to_ascii_lowercase()
        .chars()
        .map(|c| {
            CHAR_TO_DIGIT_MAPPING
                .get(&c)
                .ok_or(format!("Invalid character: {c}"))
        })
        .collect::<Result<String, _>>()
}

pub fn find_matching_words(code: String, exact: bool, dict: &Dictionary) -> Vec<&'static str> {
    let mut words: Vec<&str> = if exact {
        dict.codes_to_words.get(&code).cloned().unwrap_or_default()
    } else {
        dict.trie
            // this returns t9 codes matching the given one, e.g.
            // "435" -> ["435", "4355", "4351"]
            .predictive_search(code)
            // finds and merges all words matching the codes above
            .map(|code: String| dict.codes_to_words.get(&code).cloned().unwrap_or_default())
            .flatten()
            .collect()
    };
    words.sort();
    words
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_string_to_t9_code() {
        assert_eq!(word_to_t9_code("hello").unwrap(), "43556");
        assert_eq!(word_to_t9_code("hel").unwrap(), "435");
        assert_eq!(word_to_t9_code("hej").unwrap(), "435");
        assert_eq!(word_to_t9_code("gel").unwrap(), "435");
        assert_eq!(word_to_t9_code("t9").unwrap(), "89");
        assert_eq!(word_to_t9_code("~!!").unwrap_err(), "Invalid character: ~");
    }

    #[test]
    fn test_create_dictionary() {
        assert!(create_dictionary(vec!["hello", "world", "help"]).is_ok());
        assert!(create_dictionary(vec!["hello", "!"]).is_err());
        assert!(create_dictionary(vec![]).is_ok());
    }

    #[test]
    fn test_find_matching_words() {
        let dict = create_dictionary(vec!["hello", "world", "help", "gel", "hej"]).unwrap();

        // exact search
        assert_eq!(
            find_matching_words(word_to_t9_code("hello").unwrap(), true, &dict),
            vec!["hello"]
        );
        assert_eq!(
            // "gel" and "hej" have the same t9 code 435
            find_matching_words(word_to_t9_code("hel").unwrap().to_string(), true, &dict),
            vec!["gel", "hej"]
        );
        assert!(
            find_matching_words(word_to_t9_code("hen").unwrap().to_string(), true, &dict)
                .is_empty()
        );
        assert!(find_matching_words(word_to_t9_code("another").unwrap(), true, &dict).is_empty());

        // prefix search
        assert_eq!(
            find_matching_words(word_to_t9_code("hel").unwrap().to_string(), false, &dict),
            vec!["gel", "hej", "hello", "help"]
        );
        assert_eq!(
            find_matching_words(word_to_t9_code("gel").unwrap().to_string(), false, &dict),
            vec!["gel", "hej", "hello", "help"]
        );
    }
}

static CHAR_TO_DIGIT_MAPPING: LazyLock<HashMap<char, char>> = LazyLock::new(|| {
    let digit_to_letters = [
        ('2', "abc"),
        ('3', "def"),
        ('4', "ghi"),
        ('5', "jkl"),
        ('6', "mno"),
        ('7', "pqrs"),
        ('8', "tuv"),
        ('9', "wxyz"),
    ];

    let mut map: HashMap<char, char> = digit_to_letters
        .iter()
        .flat_map(|(digit, letters)| letters.chars().map(|c| (c, *digit)))
        .collect();

    for digit in '0'..='9' {
        map.insert(digit, digit);
    }
    map
});
