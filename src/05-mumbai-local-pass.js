/**
 * 🚂 Mumbai Local Train Pass Generator
 *
 * Aaj se tu Mumbai local ka digital pass system bana raha hai! Passenger
 * ka data milega aur tujhe ek formatted pass string generate karni hai.
 * Pass mein sab details honi chahiye ek specific format mein.
 *
 * Rules:
 *   - passenger object mein required fields: name, from, to, classType
 *   - classType must be "first" ya "second" (case-insensitive check)
 *   - Pass ID generate karo:
 *     classType ka first char uppercase + from ke pehle 3 letters uppercase
 *     + to ke pehle 3 letters uppercase
 *     Example: "first", "dadar", "andheri" => "F" + "DAD" + "AND" = "FDADAND"
 *   - Output format using template literal:
 *     Line 1: "MUMBAI LOCAL PASS"
 *     Line 2: "---"
 *     Line 3: "Name: <NAME IN UPPERCASE>"
 *     Line 4: "From: <From in Title Case>"
 *     Line 5: "To: <To in Title Case>"
 *     Line 6: "Class: <FIRST or SECOND>"
 *     Line 7: "Pass ID: <PASSID>"
 *   - Title Case = first letter uppercase, rest lowercase
 *   - Lines are separated by \n (newline)
 *   - Hint: Use template literals, slice(), toUpperCase(), toLowerCase(),
 *     charAt(), typeof
 *
 * Validation:
 *   - Agar passenger object nahi hai ya null hai, return "INVALID PASS"
 *   - Agar koi required field (name, from, to, classType) missing hai
 *     ya empty string hai, return "INVALID PASS"
 *   - Agar classType "first" ya "second" nahi hai, return "INVALID PASS"
 *
 * @param {{ name: string, from: string, to: string, classType: string }} passenger
 * @returns {string} Formatted pass or "INVALID PASS"
 *
 * @example
 *   generateLocalPass({ name: "rahul sharma", from: "dadar", to: "andheri", classType: "first" })
 *   // => "MUMBAI LOCAL PASS\n---\nName: RAHUL SHARMA\nFrom: Dadar\nTo: Andheri\nClass: FIRST\nPass ID: FDADAND"
 *
 *   generateLocalPass(null)
 *   // => "INVALID PASS"
 */
export function generateLocalPass(passenger) {


  //Validate input
  if (typeof passenger !== "object" || passenger == null) return "INVALID PASS";

  if (passenger.name == undefined || passenger.from == undefined || passenger.to == undefined || passenger.classType == undefined) return "INVALID PASS";

  if (passenger.name.trim() == "" || passenger.from.trim() == "" || passenger.to.trim() == "" || passenger.classType.trim() == "") return "INVALID PASS";

  //convert string into lower case
  let name = passenger.name.toLowerCase();
  let from = passenger.from.toLowerCase();
  let to = passenger.to.toLowerCase();
  let classType = passenger.classType.toLowerCase();

  //check for valid classType
  if (classType !== 'first' && classType !== 'second') return "INVALID PASS";



  // let lines = [`MUMBAI LOCAL PASS`,
  //   `---`,
  //   `Name: ${name.toUpperCase()}`,
  //   `From: ${from.charAt(0).toUpperCase() + from.slice(1, from.length)}`,
  //   `To: ${to.charAt(0).toUpperCase() + to.slice(1, to.length)}`,
  //   `Class: ${classType.toUpperCase()}`,
  //   `Pass ID: ${classType.charAt(0).toUpperCase() + from.slice(0, 3).toUpperCase() + to.slice(0, 3).toUpperCase()}`].join('\n');

  return `MUMBAI LOCAL PASS
---
Name: ${name.toUpperCase()}
From: ${from.charAt(0).toUpperCase() + from.slice(1, from.length)}
To: ${to.charAt(0).toUpperCase() + to.slice(1, to.length)}
Class: ${classType.toUpperCase()}
Pass ID: ${classType.charAt(0).toUpperCase() + from.slice(0, 3).toUpperCase() + to.slice(0, 3).toUpperCase()}`;

}
