/**
 * 🎬 Bollywood Movie Title Fixer
 *
 * Pappu ne ek movie database banaya hai lekin usne saare titles galat type
 * kar diye - kuch ALL CAPS mein, kuch all lowercase mein, kuch mein extra
 * spaces hain. Tu fix kar de titles ko proper Title Case mein!
 *
 * Rules:
 *   - Extra spaces hatao: leading, trailing, aur beech ke multiple spaces ko
 *     single space banao
 *   - Har word ka pehla letter uppercase, baaki lowercase (Title Case)
 *   - EXCEPTION: Chhote words jo Title Case mein lowercase rehte hain:
 *     "ka", "ki", "ke", "se", "aur", "ya", "the", "of", "in", "a", "an"
 *     LEKIN agar word title ka PEHLA word hai toh capitalize karo
 *   - Hint: Use trim(), split(), map(), join(), charAt(), toUpperCase(),
 *     toLowerCase(), slice()
 *
 * Validation:
 *   - Agar input string nahi hai, return ""
 *   - Agar string trim karne ke baad empty hai, return ""
 *
 * @param {string} title - Messy Bollywood movie title
 * @returns {string} Cleaned up Title Case title
 *
 * @example
 *   fixBollywoodTitle("  DILWALE   DULHANIA   LE   JAYENGE  ")
 *   // => "Dilwale Dulhania Le Jayenge"
 *
 *   fixBollywoodTitle("dil ka kya kare")
 *   // => "Dil ka Kya Kare"
 */
export function fixBollywoodTitle(title) {

  if (typeof (title) !== 'string' || title.trim() == "") return "";

  let newArray = title.split(' ')

  let test = ["Ka", "Ki", "Ke", "Se", "Aur", "Ya", "The", "Of", "In", "A", "An"]


  // filter extra spacees.
  newArray = newArray.filter(e => {
    if (e === "") return false;
    return true;
  })

  //Converting into Title Case 
  newArray = newArray.map(e => {
    e = e.toLowerCase();
    e = e.charAt(0).toUpperCase() + e.slice(1, e.length);
    return e;
  })

  //Handal Exception
  test.forEach(e => {
    for (let i = 0; i < newArray.length; i++) {
      if (e == newArray[i]) {
        newArray[i] = e.toLocaleLowerCase();
      }
    }
  })

  let str = newArray.join(' ')


  str = str.charAt(0).toUpperCase() + str.slice(1, str.length)
  return str;
}
