import { parseMessage } from "../src/services/antiGriefer";

export const griefyMessages: [string, string][] = [
  ["WOOOOOOOOOOOOOOOOOO", "woo"],
  ["suuuuure", "suure"],
  ["NotLikeThis NotLikeThis NotLikeThis NotLikeThis", "notlikethis"],
  ["HIIIIIIIIIIIIII", "hii"],
  ["Helllll Yeeaaahh", "hell yeeaahh"],
  ["lolololololololololollllolololololololol", "lollol"],
  ["yayyyyy", "yayy"],
  [
    "thenor28SubHype thenor28SubHype  thenor28SubHype thenor28SubHype thenor28SubHype",
    "thenor28subhype",
  ],
  // ["%$^#&##*#(×¥", "%$^#&##*#(×¥"],
  ["NOOOOOOOO", "noo"],
  ["Homeboliooooooooooooooo", "homebolioo"],
  ["axaxaxax", "ax"],
  ["kkkkkkkkkk", "kk"],
  ["AHAHAHAHSUAHAAAAAAAAAA", "ahsuahaa"],
  ["Ayyyy we outta here", "ayy we outta here"],
];

describe("parseMessage", () => {
  it("unrepeatifies messages", () => {
    griefyMessages.forEach(([input, output]) => {
      expect(parseMessage(input)).toBe(output);
    });
  });
});
