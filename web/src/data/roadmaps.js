/* Mind Map: roadmaps, read from top to bottom like a path.
   ROADMAPS holds the detailed roadmap for each live course. Each stage is a step on the path and
   holds topics. A topic with "go" links to a lesson, checkpoint or project on this site; topics
   without one are on the way. Learners can tick any topic as done. */
export const ROADMAPS={
 cf:{t:"Computer fundamentals",course:"cf",intro:"How a computer works, from the first idea to the files, commands and numbers inside it.",stages:[
  {t:"What a computer is",topics:[
   {id:"cf-what",t:"What a computer is",d:"A machine that follows stored instructions to turn input into output. Hardware is the parts you can touch; software is the instructions.",go:"lesson-c1"},
   {id:"cf-why",t:"Why we need computers",d:"Computers are fast, never get bored and repeat a task exactly, but they only do what they are told.",go:"lesson-c2"},
   {id:"cf-history",t:"A short history",d:"From the Analytical Engine to the transistor, the microprocessor and the smartphone in your pocket.",go:"lesson-c3"}]},
  {t:"Inside the machine",topics:[
   {id:"cf-ipo",t:"Input, processing, output",d:"The pattern behind every app: something goes in, gets worked on, and something comes out.",go:"lesson-n1"},
   {id:"cf-parts",t:"CPU, RAM and storage",d:"The CPU does the work, RAM holds what is in use and forgets it when the power goes, and storage keeps files.",go:"lesson-n2"},
   {id:"cf-algo",t:"Programs and algorithms",d:"An algorithm is a precise list of steps; a program is an algorithm written for a computer.",go:"lesson-n3"}]},
  {t:"Files and the terminal",topics:[
   {id:"cf-paths",t:"Files, folders and paths",d:"How files are organised in folders, and how absolute and relative paths point to them.",go:"lesson-n4"},
   {id:"cf-shell",t:"The shell and the terminal",d:"Typing commands instead of clicking: what the terminal, the shell and the prompt are.",go:"lesson-n5"},
   {id:"cf-cmds",t:"Four commands: pwd, ls, cd, mkdir",d:"Find where you are, list what is there, move around and make folders.",go:"lesson-n6"}]},
  {t:"How data is stored",topics:[
   {id:"cf-bits",t:"Bits and bytes",d:"Everything is stored as bits, tiny on and off switches, grouped in eights called bytes.",go:"lesson-m1"},
   {id:"cf-binary",t:"Counting in binary",d:"Counting with only 0 and 1, where each place is worth double the one to its right.",go:"lesson-m2"},
   {id:"cf-ascii",t:"ASCII: letters as numbers",d:"How each letter, digit and symbol is given a number.",go:"lesson-m3"},
   {id:"cf-unicode",t:"Unicode and UTF-8",d:"One numbering for every writing system, including Tamil and emoji, and how it is stored.",go:"lesson-m4"}]},
  {t:"Check yourself",topics:[
   {id:"cf-check",t:"Checkpoint quiz",d:"Ten questions across the whole course.",go:"checkpoint-cf"},
   {id:"cf-project",t:"Project: Know your machine",d:"Find out what is inside your own computer, using what you have learned.",go:"project-machine"}]},
  {t:"Operating systems",soon:true,topics:[
   {id:"cf-os",t:"What an operating system does",d:"The program that runs all the others: Windows, macOS, Linux, Android and iOS."},
   {id:"cf-proc",t:"Processes and memory",d:"How many programs seem to run at once, and how each gets its share of memory."}]},
  {t:"How the internet works",soon:true,topics:[
   {id:"cf-net",t:"Networks, Wi-Fi and routers",d:"How devices at home connect to each other and to the internet."},
   {id:"cf-ipdns",t:"IP addresses and DNS",d:"Every device has an address, and DNS turns names like noolstack.com into addresses."},
   {id:"cf-http",t:"How a web page loads",d:"What happens between typing an address and seeing the page: requests and responses over HTTP."}]},
  {t:"Staying safe",soon:true,topics:[
   {id:"cf-pass",t:"Passwords and two-step sign-in",d:"Why long, unique passwords and a second step keep accounts safe."},
   {id:"cf-crypt",t:"Encryption",d:"Scrambling information so only the right person can read it."}]}
 ]},
 py:{t:"Python",course:"py",intro:"From your first line of Python to programs that decide, repeat, organise data and grow into projects.",stages:[
  {t:"Getting set up",topics:[
   {id:"py-install",t:"Installing Python and PyCharm",d:"Get Python and an editor working on your computer.",go:"lesson-n7"},
   {id:"py-first",t:"Your first program",d:"Write a script, save it and run it.",go:"lesson-n8"},
   {id:"py-repl",t:"The Python prompt",d:"Try one line at a time at the >>> prompt.",go:"lesson-n9"},
   {id:"py-hello",t:"Project: Hello, me",d:"A first small program about you.",go:"project-hello"}]},
  {t:"Numbers, names and types",topics:[
   {id:"py-maths",t:"Arithmetic",d:"Adding, dividing, whole-number division and remainders.",go:"lesson-m5"},
   {id:"py-vars",t:"Variables",d:"Giving a value a name so you can use it again.",go:"lesson-m6"},
   {id:"py-types",t:"Types of data",d:"Whole numbers, decimals, text and True or False, and why the type matters.",go:"lesson-m7"}]},
  {t:"Text and input",topics:[
   {id:"py-fstr",t:"Joining text and values",d:"Building sentences from values with f-strings.",go:"lesson-m8"},
   {id:"py-input",t:"Asking the user a question",d:"Reading what someone types with input.",go:"lesson-m9"},
   {id:"py-conv",t:"Converting between types",d:"Turning text into numbers and back with int, float and str.",go:"lesson-m10"}]},
  {t:"Details that matter",topics:[
   {id:"py-float",t:"When decimals misbehave",d:"Why 0.1 + 0.2 is not exactly 0.3, and what to do about it.",go:"lesson-m11"},
   {id:"py-comments",t:"Comments and good names",d:"Writing code that you and others can read later.",go:"lesson-m12"}]},
  {t:"Check yourself",topics:[
   {id:"py-check",t:"Checkpoint quiz",d:"Ten questions across the course so far.",go:"checkpoint-py"},
   {id:"py-tip",t:"Project: Tip calculator",d:"A program that splits a bill, using everything so far.",go:"project-tip"}]},
  {t:"Making decisions",soon:true,topics:[
   {id:"py-compare",t:"Comparisons",d:"Asking questions about values: ==, !=, <, >, <= and >=."},
   {id:"py-logic",t:"True, False and logic",d:"Combining questions with and, or and not."},
   {id:"py-if",t:"if, elif and else",d:"Running different code depending on the answer."}]},
  {t:"Repeating",soon:true,topics:[
   {id:"py-while",t:"while loops",d:"Repeating while something stays true."},
   {id:"py-for",t:"for loops and range",d:"Repeating once for each item or number."},
   {id:"py-break",t:"break and continue",d:"Leaving a loop early, or skipping to the next round."}]},
  {t:"Collections",soon:true,topics:[
   {id:"py-lists",t:"Lists",d:"An ordered row of values you can change."},
   {id:"py-tuples",t:"Tuples",d:"An ordered row of values that stays fixed."},
   {id:"py-dicts",t:"Dictionaries",d:"Looking values up by a name, like words in a dictionary."},
   {id:"py-sets",t:"Sets",d:"A group of values with no repeats."},
   {id:"py-strings",t:"Working with text",d:"Slicing, searching and changing strings."}]},
  {t:"Functions",soon:true,topics:[
   {id:"py-def",t:"Writing functions",d:"Naming a block of code so you can run it again."},
   {id:"py-params",t:"Parameters and return values",d:"Passing values in and getting an answer back."},
   {id:"py-scope",t:"Scope",d:"Where a variable can be seen and used."}]},
  {t:"Errors and files",soon:true,topics:[
   {id:"py-except",t:"Handling errors",d:"Catching problems with try and except instead of crashing."},
   {id:"py-files",t:"Reading and writing files",d:"Saving data to files and reading it back."}]},
  {t:"Bigger programs",soon:true,topics:[
   {id:"py-modules",t:"Modules and imports",d:"Using code from other files and from Python’s library."},
   {id:"py-pip",t:"pip and virtual environments",d:"Installing packages, and keeping each project’s packages apart."},
   {id:"py-classes",t:"Classes and objects",d:"Bundling data and the functions that work on it."},
   {id:"py-tests",t:"Testing your code",d:"Writing small checks that prove your code works."}]}
 ]}
};
