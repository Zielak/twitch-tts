# twitch-tts

TTS for your Twitch chat.

- Choose and configure voices (pitch and rate ranges)
- Each user gets their own voice style
- Simple message filtering removes repetition and _problematic_ characters
- Configuration is saved to local storage

## TODO

- Connection with Twitch chat

### Message filtering:

1. [ ] Clear _[unusual](https://util.unicode.org/UnicodeJsps/properties.jsp?a=General_Category#General_Category)_ characters (?)
1. [x] Trim repetitive characters within words `suuuuuuuure -> suure`
1. [ ] Remove repetition within words `lololol -> lol`
1. [ ] Remove repetitive words within whole message `ha ha ha ha -> ha`

### Configuration

- Disable reading symbols by [Unicode general categories](https://util.unicode.org/UnicodeJsps/properties.jsp?a=General_Category#General_Category) (emoji and some symbols may take long to read out)
- Censorship, word replacement?
- Save configuration online (Google Drive?) and export/import to file

---

### TODO Later

- Filter available voices by "chosen" and maybe hide the whole panel too.
