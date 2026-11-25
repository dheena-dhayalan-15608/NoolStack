/* Course content: lessons, quizzes, tasks, glossary, error help, planned courses, legal and social links.
   Moved unchanged from the legacy js/content.js; each top-level constant is now exported. */
/* ---------- course content ---------- */
export const NODES=[
{id:"n1",no:"0.1",t:"Input, processing, output",m:30,w:"ipo",
 why:"Every app follows one pattern: you type a message (input), the phone works on it (processing), and it appears on screen (output). Once you can spot the pattern, programs become easier to plan.",
 L:["A <b>computer</b> is a machine that follows instructions to turn information into other information.",
  "<b>Input</b> is information going in: key presses, clicks, a photo from a camera, a file. <b>Processing</b> is the work done on it: adding, sorting, brightening an image. <b>Output</b> is the result coming out: text on a screen, sound, a saved file, a printed page.",
  "Many systems also keep information for later. That is called <b>storage</b>, and the next lesson covers it.",
  "When you plan any program, ask three questions in order. What goes in? What must happen to it? What should come out?"],
 an:"A toaster: bread goes in, heat is applied for a set time, toast comes out.",
 ex:{t:"A calculator working out 12 + 30",walk:["Input: you tap 1, 2, +, 3, 0 and =.","Processing: it turns the taps into the numbers 12 and 30 and adds them.","Output: 42 appears on the display.","Notice that nothing is calculated until = starts the processing."]},
 P:[{q:"You tap Shuffle and a random song plays. Which part is the processing?",o:["Your tap on the button","Choosing the random song","The music coming out of the speaker"],c:1,y:"The tap is the input and the music is the output. The work in between, picking a song, is the processing.",x:"Many people pick the tap. That mixes up the trigger with the work."},
  {q:"A digital thermometer shows 21°C. What is the input?",o:["The number on the screen","The sensor’s temperature reading","The battery"],c:1,y:"The sensor reading goes in. The screen showing 21°C is the output."}],
 Q:[{q:"Which of these is an output device?",o:["Keyboard","Microphone","Speaker","Mouse"],c:2,h:"Which one sends something to you?",e:"A speaker sends sound out to you. The other three send information in."},
  {q:"A sign-up form checks that your password has at least 8 characters. The checking is…",o:["Input","Processing","Output","Storage"],c:1,h:"Is it something going in, work being done, or a result being shown?",e:"The password you type is input. Checking it is processing. A warning message would be output."},
  {q:"What should you ask first when planning a program?",o:["Which colours to use","What goes in and what comes out","How fast the CPU is","Which keyboard to buy"],c:1,h:"Think about what the person using it sees.",e:"Inputs and outputs are what people see, so they come first. The rest are details."},
  {q:"Spot the mistake: “A touchscreen is only an input device.”",o:["The statement is correct","It is also an output device","It is really storage","It is really processing"],c:1,h:"What else does a screen do?",e:"You touch it (input) and it shows things (output)."}],
 T:[{p:"Pick an app you used today. Write down its input, its processing and its output.",h:["What did you do first when you opened it?","Inputs are your actions. Outputs are what you saw or heard.","Fill in: “I gave it ___, it ___, and it showed me ___.”"]},
  {p:"Find one device at home that is both input and output.",h:["What can you both touch and look at?","Think about screens and headsets.","Take a phone or a headset and explain its input role and its output role."]}],
 M:[["Calling the screen “processing”.","Ask: is this doing work, or showing a result?"],["Thinking nothing happens in the middle.","Name the verb: adds, sorts, checks."]],
 G:[["computer","A machine that follows instructions to turn information into other information."],["input","Information going into a computer."],["processing","The work a computer does on information."],["output","The result that comes out of a computer."],["storage","Where information is kept for later, even with the power off."]]},

{id:"n2",no:"0.2",t:"CPU, RAM and storage",m:40,w:"kitchen",
 why:"“Out of memory”, “disk full” and “my laptop is slow” are all about these three parts. They also explain why unsaved work disappears in a power cut.",
 L:["The <b>CPU</b> (Central Processing Unit) is the chip that carries out instructions, billions of tiny steps every second. It is the “processing” from the last lesson.",
  "<b>RAM</b> (Random Access Memory) is fast, short-term working space for whatever is in use right now. It is <b>volatile</b>, which means it is wiped when the power goes off.",
  "<b>Storage</b> is long-term memory. It keeps your files when the power is off, but it is slower than RAM. Two common kinds are the SSD (solid-state drive) and the HDD (hard disk drive).",
  "Opening a program copies it from storage into RAM so the CPU can reach it quickly. Pressing Save copies your work from RAM back to storage.",
  "Sizes are measured in bytes, which a later lesson explains. A laptop usually has 8 to 32 GB (gigabytes) of RAM and 256 GB to 2 TB (terabytes) of storage."],
 an:"A kitchen. The cook is the CPU. The countertop is RAM: quick to reach, cleared at closing time. The pantry is storage: slower to reach, but everything stays there overnight.",
 ex:{t:"Editing a photo without saving",walk:["You open a photo. A copy goes from storage into RAM.","You edit for 10 minutes. Only the copy in RAM changes.","The battery dies. RAM is wiped.","You restart and open the photo. The old version is still in storage. The edits are gone."]},
 P:[{q:"You have 50 browser tabs open and the laptop slows down. Which part is full?",o:["Storage","RAM","The screen"],c:1,y:"Open tabs live in RAM, the working space.",x:"People often say storage, because everyday speech uses “memory” for both."},
  {q:"You save a file and then restart the computer. Is the file still there?",o:["Yes","No","Only if the screen stayed on"],c:0,y:"Saving copied it to storage, which keeps data without power."}],
 Q:[{q:"Which part carries out instructions?",o:["RAM","SSD","CPU","Monitor"],c:2,h:"Which one is the cook?",e:"The CPU does the work. RAM and the SSD only hold things."},
  {q:"Memory that is wiped when the power goes off is called…",o:["volatile","permanent","compressed","encrypted"],c:0,h:"The word also describes things that change suddenly.",e:"Volatile memory, such as RAM, loses its contents without power."},
  {q:"Why are programs copied into RAM before they run?",o:["RAM is bigger than storage","The CPU can reach RAM faster","Storage cannot hold programs","So they can be deleted"],c:1,h:"Countertop or pantry: which is quicker to reach?",e:"RAM is faster to reach. It is usually smaller than storage, not bigger."},
  {q:"Spot the mistake: “My file is safe because I typed it, even though I never saved.”",o:["The statement is correct","Wrong: it is only in RAM","Wrong: it is saved to the CPU","Correct if the screen is on"],c:1,h:"Where does your work live while you type?",e:"Unsaved work lives only in RAM, which is wiped without power."}],
 T:[{p:"Find out how much RAM and storage your own computer has.",h:["Where does a computer list its specifications?","Windows: Settings, then System, then About and Storage. Mac: Apple menu, then About This Mac.","Write it down as “RAM = __ GB, storage = __ GB”."]},
  {p:"Explain out loud why the Save button exists.",h:["Where does your work live while you are typing?","RAM is volatile.","Use the kitchen: the countertop is cleared at closing time."]}],
 M:[["Saying “memory” when you mean storage.","In computing, memory means RAM."],["Thinking more storage makes a computer faster.","Speed depends on the CPU and on having enough RAM."]],
 G:[["CPU","Central Processing Unit: the chip that carries out instructions."],["RAM","Random Access Memory: fast, temporary working memory."],["volatile","Wiped when the power goes off."],["SSD and HDD","Two kinds of long-term storage drive."],["GB and TB","Gigabyte and terabyte: units for measuring memory and storage."]]},

{id:"n3",no:"0.3",t:"Programs and algorithms",m:40,w:"robot",
 why:"Route planners, search engines and social feeds all run on algorithms. Writing exact steps is the core skill of programming. Python is just the language you write them in.",
 L:["An <b>algorithm</b> is a finite, ordered list of clear steps that solves a problem. A person or a computer can follow it.",
  "A good algorithm is <b>unambiguous</b> (each step has only one meaning), it is ordered, and it finishes.",
  "A <b>program</b> is an algorithm written in a <b>programming language</b>: a strict language a computer can follow, such as Python. The text of a program is called <b>code</b>.",
  "Computers do exactly what they are told and never guess. “Make a sandwich” is too vague. “Pick up 2 slices of bread. Spread 1 spoon of butter on one slice.” is closer.",
  "The writing rules of a language are its <b>syntax</b>, like grammar. The algorithm is the idea. A program is one way of writing it down."],
 an:"A recipe is an algorithm. The same recipe written on one card in French and another in English is like two programs for the same steps.",
 ex:{t:"Finding the largest number on a row of cards: 4, 9, 2, 7",walk:["Remember the first card as “biggest so far”: 4.","Look at 9. It is larger, so remember 9 instead.","Look at 2. It is not larger, so keep 9.","Look at 7. It is not larger, so keep 9.","No cards are left, so the answer is 9. You will write this as a real program later on."]},
 P:[{q:"“Start at 1. Add 2 until you reach 9. Say the number.” What is said?",o:["9","10","11"],c:0,y:"1, 3, 5, 7, 9. It lands exactly on 9 and stops."},
  {q:"“Start at 2. Add 2 until you reach 9.” What happens?",o:["It stops at 8","It stops at 10","It never stops"],c:2,y:"2, 4, 6, 8, 10 and onwards. It skips 9, so the stop condition is never met.",x:"“It stops near 9.” A computer checks exactly. It does not round."}],
 Q:[{q:"An algorithm must be…",o:["written in Python","clear, ordered and finishing","run on a computer","short"],c:1,h:"Is a recipe an algorithm?",e:"A recipe is an algorithm too, so it needs neither Python nor a computer."},
  {q:"A program is…",o:["any idea","an algorithm written in a programming language","a part inside the computer","a folder"],c:1,h:"The idea, or the idea written down?",e:"The algorithm is the idea. The program is that idea written in a language a computer can follow."},
  {q:"Syntax means…",o:["how fast a program runs","the writing rules of a language","a kind of error only","the CPU"],c:1,h:"Think of grammar.",e:"Syntax is the grammar of a language. A “syntax error” means a rule was broken."},
  {q:"Spot the bug: “Repeat: walk forward.”",o:["Nothing is wrong","There is no stopping condition","It is in the wrong language","It is too short"],c:1,h:"When does it end?",e:"With no stop condition, the walker never finishes."}],
 T:[{p:"Write robot-proof steps for brushing your teeth, in 8 steps or fewer.",h:["What do you touch first?","One action per step.","Start with “1. Pick up the toothbrush with your right hand.” and end with a step that says when to stop."]},
  {p:"Change the “largest card” steps so they find the smallest card.",h:["How did the “largest” version remember a card?","Only one comparison needs to change.","Swap “larger” for “smaller”."]}],
 M:[["Vague steps.","Use verbs and amounts you can measure."],["No stop condition.","Ask: when does this end?"]],
 G:[["algorithm","A finite, ordered list of clear steps that solves a problem."],["program","An algorithm written in a programming language."],["programming language","A strict language a computer can follow, such as Python."],["code","The text of a program."],["syntax","The writing rules of a language."],["unambiguous","Having only one possible meaning."]]},

{id:"n4",no:"0.4",t:"Files, folders and paths",m:45,w:"paths",
 why:"“File not found” is one of the most common problems beginners meet, and it is almost always a path problem.",
 L:["A <b>file</b> is named data kept in storage, such as <code>hello.py</code>. The part after the dot is the <b>extension</b>. <code>.py</code> means a Python program.",
  "A <b>folder</b> (also called a <b>directory</b>) holds files and other folders. Together they form a <b>tree</b>. The top of the tree is the <b>root</b>: <code>C:\\</code> on Windows, <code>/</code> on a Mac or on Linux.",
  "A <b>path</b> is a file’s address. An <b>absolute path</b> starts at the root, like <code>/Users/ana/code/hello.py</code>. Windows writes it with backslashes: <code>C:\\Users\\ana\\code\\hello.py</code>.",
  "A <b>relative path</b> starts from where you are now, like <code>code/hello.py</code>. One dot <code>.</code> means “this folder”. Two dots <code>..</code> mean “the folder above”, which is called the parent.",
  "Your <b>home folder</b> is your personal starting folder. Avoid spaces in the names of code folders: use <code>my_code</code>, not <code>my code</code>."],
 an:"An absolute path is a full postal address. A relative path is “two doors down from here”.",
 ex:{t:"Two ways to point at the same file",code:"/Users/ana/\n    code/\n        hello.py\n    notes/\n        todo.txt",walk:["You are in /Users/ana/notes and you want hello.py.","Absolute path: /Users/ana/code/hello.py. It works from anywhere.","Relative path: ../code/hello.py. Go up to ana, then down into code."]},
 P:[{q:"You are in /Users/ana/code. Where does ../notes/todo.txt point?",o:["/Users/ana/notes/todo.txt","/Users/ana/code/notes/todo.txt","/Users/notes/todo.txt"],c:0,y:"The two dots go up to /Users/ana. Then notes/todo.txt goes down from there.",x:"Forgetting that two dots go up one level."},
  {q:"Is hello.py, written on its own, an absolute or a relative path?",o:["Absolute","Relative","Neither"],c:1,y:"It does not start at the root, so it is relative to where you are."}],
 Q:[{q:"What does .. mean?",o:["The current folder","The parent folder","The root","The home folder"],c:1,h:"One level up.",e:"Two dots mean the folder above the one you are in."},
  {q:"Which is an absolute path on Windows?",o:["code\\hello.py","..\\hello.py","C:\\Users\\ana\\hello.py","hello.py"],c:2,h:"Absolute paths start at the root.",e:"It starts at C:\\, the root on Windows."},
  {q:"In game.py, the .py part is the…",o:["folder","extension","path","root"],c:1,h:"It comes after the dot.",e:"The extension says what kind of file it is."},
  {q:"Spot the bug: commands keep failing on a folder named My Python Stuff. Why?",o:["The capital letters","The spaces","The length","The missing extension"],c:1,h:"How does a terminal separate words?",e:"A terminal splits a command at spaces, so it sees three separate words."}],
 T:[{p:"Create a folder called python_course in your home folder (by clicking, for now) and write down its absolute path.",h:["Where is your home folder?","Windows: copy the address bar in File Explorer. Mac: in Finder, choose View, then Show Path Bar.","It looks like C:\\Users\\you\\python_course or /Users/you/python_course."]},
  {p:"From python_course, write the relative path to a file called notes.txt on your Desktop.",h:["Where is Desktop compared with your home folder?","You need to go up once first.","../Desktop/notes.txt"]}],
 M:[["Losing files.","Keep everything in one course folder."],["Mixing up the two kinds of slash.","Python accepts / on every system."]],
 G:[["file","Named data kept in storage."],["extension","The letters after the dot in a file name."],["folder (directory)","A container for files and other folders."],["tree","The branching arrangement of folders inside folders."],["root","The top of the folder tree."],["path","The address of a file or folder."],["absolute path","A path that starts at the root."],["relative path","A path that starts from where you are now."],["home folder","Your personal starting folder."]]},

{id:"n5",no:"0.5",t:"Clicking and typing: the shell and the terminal",m:35,w:"clickcmd",
 why:"Developers install tools, run Python files and manage their projects from a terminal. Typed commands are precise and easy to repeat.",
 L:["A <b>GUI</b> (Graphical User Interface) uses windows, icons and clicks. A <b>CLI</b> (Command-Line Interface) uses typed text commands.",
  "A <b>shell</b> is the program that reads your command, asks the <b>operating system</b> to do it, and prints the result. The operating system is the main software that runs the computer, such as Windows or macOS. Windows has a shell called PowerShell, a Mac has zsh, and Linux usually has bash.",
  "A <b>terminal</b> is the window the shell runs in. People use the two words for the same thing.",
  "The <b>prompt</b> is the text that shows the shell is ready, such as <code>PS C:\\Users\\ana&gt;</code> or <code>ana@mac ~ %</code>.",
  "A <b>command</b> often takes <b>arguments</b>: extra words that say what to act on, as in <code>mkdir projects</code>.",
  "The terminal has no undo, so read a command before you press Enter. This course only uses safe commands.",
  "To open one: on Windows, open Start and type “Terminal”. On a Mac, open Spotlight and type “Terminal”. On Linux, Ctrl+Alt+T often works."],
 an:"A GUI is pointing at pictures on a menu. A CLI is telling the waiter your exact order.",
 ex:{t:"Reading a prompt",code:"PS C:\\Users\\ana>",walk:["PS means PowerShell.","C:\\Users\\ana is the folder you are in.","The > marks the end of the prompt. You type after it."]},
 P:[{q:"You type hello in PowerShell and press Enter. What happens?",o:["It replies “hello”","An error says hello is not recognized","Nothing at all"],c:1,y:"The shell only knows commands, and it has no command named hello.",x:"Expecting a reply, as if the shell were a chat."},
  {q:"In the prompt ana@mac ~ %, what does ~ mean?",o:["The home folder","The root","An error"],c:0,y:"The ~ symbol is short for your home folder."}],
 Q:[{q:"Which program reads and runs your typed commands?",o:["The GUI","The shell","The CPU","A folder"],c:1,h:"It runs inside the terminal window.",e:"The shell reads each command and asks the operating system to carry it out."},
  {q:"Which of these is a CLI action?",o:["Double-clicking an icon","Typing mkdir test","Dragging a file","Right-clicking"],c:1,h:"CLI means typed commands.",e:"Typing a command is the command-line way. The others are GUI actions."},
  {q:"What does the prompt tell you?",o:["The computer is off","The shell is ready, and where you are","There was an error","Your password"],c:1,h:"Look at what is inside it.",e:"It shows the shell is waiting, and usually which folder you are in."},
  {q:"Spot the bug: you typed a command but nothing happened. What did you forget?",o:["To save","To press Enter","To restart","To click OK"],c:1,h:"How does the shell know you have finished typing?",e:"A command only runs when you press Enter."}],
 T:[{p:"Open a terminal and name each part of your prompt.",h:["How do you search for apps on your computer?","Search for “Terminal” or “PowerShell”.","Name three parts: the shell, the folder, the end symbol."]},
  {p:"Type a nonsense word, press Enter, and read the error message out loud.",h:["What does the last line say?","Look for “not recognized” or “command not found”.","Say it in your own words: “the shell has no command with that name”."]}],
 M:[["Typing Python code at the shell prompt.","Python code goes into Python. The Python course shows the difference."],["Being afraid of the terminal.","Every command in this course is safe."]],
 G:[["GUI","Graphical User Interface: windows, icons and clicks."],["CLI","Command-Line Interface: typed text commands."],["shell","The program that reads and runs your typed commands."],["terminal","The window a shell runs in."],["prompt","The text that shows the shell is ready for a command."],["command","An instruction you type for the shell."],["argument","An extra word that tells a command what to act on."],["operating system","The main software that runs a computer, such as Windows or macOS."]]},

{id:"n6",no:"0.6",t:"Four commands: pwd, ls, cd, mkdir",m:60,w:"term",
 why:"Before you can run a Python file from the terminal, the terminal must be in the folder that holds it. These four commands get you there.",
 L:["The shell is always “standing in” one folder, called the <b>current working directory</b>. Relative paths start from there.",
  "<code>pwd</code> (print working directory) shows where you are.",
  "<code>ls</code> (list) shows what is in the folder. The older Command Prompt on Windows uses <code>dir</code> instead. PowerShell accepts both.",
  "<code>cd</code> (change directory) moves you. <code>cd python_course</code> goes in, <code>cd ..</code> goes up one level, and <code>cd ~</code> goes home.",
  "<code>mkdir</code> (make directory) creates a folder: <code>mkdir level0</code>.",
  "Press <b>Tab</b> to finish a name automatically, and the <b>up arrow</b> to bring back an earlier command.",
  "On Linux, names are <b>case-sensitive</b>: <code>Code</code> and <code>code</code> are different folders. On Windows and on most Macs they are not, but type names exactly anyway. Put names that contain spaces in quotes: <code>cd \"My Folder\"</code>."],
 an:"pwd asks “which room am I in?” ls looks around the room. cd walks through a door. mkdir builds a new room.",
 ex:{t:"A short trip in the terminal (Mac or Linux)",code:"$ pwd\n/Users/ana\n$ mkdir python_course\n$ cd python_course\n$ pwd\n/Users/ana/python_course\n$ ls\n$ cd ..\n$ pwd\n/Users/ana",walk:["You start in the home folder.","mkdir makes a new folder.","cd steps into it, and pwd confirms where you are.","ls prints nothing, because the folder is empty.","cd .. goes back up.","The $ is the prompt. Do not type it. PowerShell shows the result of pwd as a small table headed “Path”."]},
 P:[{q:"You are in /Users/ana/python_course. You run cd .. twice, then pwd. What prints?",o:["/Users/ana","/Users","/"],c:1,y:"Each cd .. goes up one level: first to /Users/ana, then to /Users.",x:"Counting only one step up."},
  {q:"You run ls in an empty folder. What prints?",o:["An error","Nothing","The word “empty”"],c:1,y:"An empty folder is not an error. There is simply nothing to list."},
  {q:"On Linux the folder is named python_course. You type cd Python_Course. What happens?",o:["It works","An error: no such file or directory","It creates the folder"],c:1,y:"Linux names are case-sensitive, so the capital letters do not match. On Windows it would work."}],
 Q:[{q:"Which command shows the folder you are in?",o:["ls","cd","pwd","mkdir"],c:2,h:"Print working directory.",e:"pwd prints the current working directory."},
  {q:"What does cd .. do?",o:["Deletes the folder","Moves up one level","Lists files","Goes to the root"],c:1,h:"Two dots mean the parent.",e:"It moves to the parent folder."},
  {q:"In the old Windows Command Prompt, which command lists a folder?",o:["list","dir","show","pwd"],c:1,h:"It is short for “directory”.",e:"dir lists the contents there. PowerShell accepts ls as well."},
  {q:"Spot the bug: mkdir my project made two folders. What fixes it?",o:["mkdir my_project or mkdir \"my project\"","cd my project","ls my project","Restarting the terminal"],c:0,h:"How does the shell split words?",e:"The space made two arguments. Use an underscore, or put the name in quotes."}],
 T:[{p:"On your own computer, using only the terminal, create python_course, then level0 inside it, and go into level0.",h:["Which command makes folders?","Make one, cd into it, then make the next.","mkdir python_course, cd python_course, mkdir level0, cd level0. Check with pwd."]},
  {p:"Go back to your home folder with one command.",h:["Is there a shortcut for home?","It is the ~ symbol.","cd ~ and then pwd to check."]}],
 M:[["“No such file or directory”.","A typo, the wrong capital letters or the wrong folder. Run pwd and ls, and use Tab."],["Typing the $ or the >.","The prompt is not part of the command."]],
 G:[["current working directory","The folder the shell is in right now."],["pwd","The command that prints the current working directory."],["ls","The command that lists what is in a folder (dir in the old Windows Command Prompt)."],["cd","The command that moves to another folder."],["mkdir","The command that makes a new folder."],["case-sensitive","Treating capital and small letters as different."]]},

{id:"n7",no:"0.7",t:"Installing Python and PyCharm",m:60,w:"install",
 why:"Python code cannot run until a Python interpreter is installed. PyCharm gives you one place to write your code, run it and see the result.",
 L:["An <b>interpreter</b> is a program that reads Python code and carries it out line by line. “Installing Python” means installing this interpreter.",
  "An <b>IDE</b> (Integrated Development Environment) is one app for writing, running and fixing code. <b>PyCharm</b> is an IDE made for Python.",
  "Version numbers have three parts. In 3.15.2, the 3 is the major version, 15 is the feature release, and 2 is a bug-fix update.",
  "<b>Windows:</b> install the “Python install manager” from the Microsoft Store or from python.org/downloads. Open a terminal, run <code>py install 3.15</code>, then check with <code>python --version</code>.",
  "<b>Mac:</b> download the installer from python.org/downloads. Check with <code>python3 --version</code>.",
  "<b>Linux:</b> Python is usually already there. Check with <code>python3 --version</code>.",
  "<b>PyCharm:</b> install it from jetbrains.com/pycharm. It can be used free of charge. When you create a new project, PyCharm sets up Python for that project in a folder called <code>.venv</code>. It also adds a few project files, which you can ignore for now.",
  "<b>Cannot install anything?</b> You can still do the next two lessons at pythontutor.com, which runs Python in the browser."],
 an:"Python is the engine. PyCharm is the dashboard you drive it from.",
 ex:{t:"Installing and checking on Windows",code:"PS C:\\Users\\ana> py install 3.15\nPS C:\\Users\\ana> python --version\nPython 3.15.2",walk:["The first command downloads and installs Python. It prints progress text that varies.","The second command asks Python to report its version.","Seeing a version number is your proof that the install worked."]},
 P:[{q:"On a Mac, python --version says “command not found”. What is the most likely reason?",o:["The install failed","On a Mac the command is usually python3","The Mac is too old"],c:1,y:"A Mac and Linux usually name the command python3.",x:"Assuming the install failed before trying python3."},
  {q:"A new PyCharm project contains some files you did not create, such as .venv. Has something gone wrong?",o:["Yes","No: PyCharm creates them to manage the project","Only on Windows"],c:1,y:"They are project housekeeping. You can ignore them for now. A later part of this course explains them."}],
 Q:[{q:"What does an interpreter do?",o:["Designs websites","Reads and runs Python code","Stores files","Types for you"],c:1,h:"It “interprets” your code for the computer.",e:"It reads your code line by line and carries it out."},
  {q:"In version 3.15.2, what is the final 2?",o:["The major version","The feature release","A bug-fix update","The day it was built"],c:2,h:"The smallest changes come last.",e:"The last number counts bug-fix updates."},
  {q:"Which is the recommended way to install Python on Windows today?",o:["The Python install manager","Any website that offers a download","An installer from 2019","Nothing: it is built in"],c:0,h:"The official Python site names it.",e:"The official documentation recommends the Python install manager."},
  {q:"Spot the mistake: “PyCharm is Python, so installing PyCharm is all you need.”",o:["The statement is correct","Wrong: PyCharm is an editor, and it still needs a Python interpreter","Wrong: PyCharm only works on Windows","Wrong: Python is part of the terminal"],c:1,h:"Which one is the engine, and which is the dashboard?",e:"PyCharm is where you write and run code. The interpreter is what actually runs it, and it has to be installed as well."}],
 T:[{p:"Install Python and get a terminal to show you its version.",h:["Which installer does your system use?","Windows: py install 3.15. Mac: the installer from python.org.","Open a new terminal window, then run python --version (or python3 --version)."]},
  {p:"Install PyCharm, create a project, and find where it shows which Python the project uses.",h:["Where might an app show its settings?","Look at the bottom-right corner of the window.","The interpreter name is shown at the bottom right. Clicking it opens the interpreter settings."]}],
 M:[["An old terminal window cannot find the new Python.","Close it and open a new one."],["Seeing a different version than you expected.","More than one Python may be installed. Check with the version command."]],
 G:[["interpreter","A program that reads Python code and carries it out line by line."],["IDE","Integrated Development Environment: one app for writing, running and fixing code."],["PyCharm","An IDE for Python, made by JetBrains."],["version number","Numbers such as 3.15.2 that say which release of a program you have."]]},

{id:"n8",no:"0.8",t:"Your first program",m:45,w:"runner",
 why:"Writing code in a file and running it is how all software is made. Running it from the terminal proves you know where your program lives.",
 L:["A <b>script</b> is a text file of Python code saved with the <code>.py</code> extension.",
  "<code>print()</code> is a built-in instruction that shows whatever is inside its brackets. It is a kind of thing called a function, which a later part of this course covers.",
  "Text inside quotes, like <code>\"Hello\"</code>, is called a <b>string</b>. It is text data. Later lessons have more on strings.",
  "Python runs a script from top to bottom, one line at a time.",
  "<b>In PyCharm:</b> right-click a folder in your project and choose New, then Python File. Name it <code>hello</code>, and PyCharm adds the <code>.py</code> ending. Type your code, then right-click in the editor and choose Run. The result appears in a panel at the bottom.",
  "<b>In the terminal:</b> <code>cd</code> to the folder that holds the file, then run <code>python hello.py</code> on Windows, or <code>python3 hello.py</code> on a Mac or Linux. If Python says it cannot open the file, you are in the wrong folder."],
 an:"A script is a written speech. Running it is reading the speech aloud from top to bottom.",
 ex:{t:"Three lines, three results",code:"print(\"Hello, world!\")\nprint(\"My name is Ana.\")\nprint(\"I am learning Python\")",out:"Hello, world!\nMy name is Ana.\nI am learning Python",walk:["Each print runs after the one above it.","Each print starts a new line.","The quotes mark where the text starts and ends. They are not shown."]},
 P:[{q:"What does this show?",code:"print(\"A\")\nprint(\"B\")",o:["AB on one line","A and B on separate lines","B, then A"],c:1,y:"Each print starts a new line.",x:"AB on one line."},
  {q:"What does this show?",code:"print(\"2 + 3\")",o:["5","2 + 3","An error"],c:1,y:"The quotes make it text, so Python shows it exactly as written.",x:"5. The quotes stop Python from doing the sum."},
  {q:"And this?",code:"print(2 + 3)",o:["5","2 + 3","An error"],c:0,y:"Without quotes, Python does the sum first and prints the result."}],
 Q:[{q:"Python scripts end with…",o:[".txt",".py",".exe",".python"],c:1,h:"Two letters.",e:".py marks a Python script."},
  {q:"How do you run hello.py from a Windows terminal?",o:["run hello","python hello.py","open hello","hello.txt"],c:1,h:"Name the interpreter, then the file.",e:"You tell the python interpreter which file to run."},
  {q:"In what order do the lines of a script run?",o:["Random","Bottom to top","Top to bottom","Longest first"],c:2,h:"Like reading a page.",e:"Python starts at the first line and works down."},
  {q:"Spot the bug: print(\"Hello)",o:["Nothing is wrong","The closing quote is missing","print is the wrong instruction","It needs a semicolon"],c:1,h:"Count the quote marks.",e:"Python reports “SyntaxError: unterminated string literal”. The text was opened with a quote but never closed."}],
 T:[{p:"Write a script that prints three facts about you, each on its own line.",h:["How many print lines do you need?","One piece of quoted text per print.","Write print(\"...\") three times, with your own text."]},
  {p:"Run that script from the terminal.",h:["Which folder is the file in?","cd there and check with ls.","python yourfile.py, or python3 yourfile.py on a Mac or Linux."]}],
 M:[["Curly “smart quotes” copied from a document.","Python reports “invalid character”. Retype them as plain quote marks."],["“can’t open file … No such file or directory”.","The terminal is in the wrong folder. Use cd."]],
 G:[["script","A text file of Python code, saved with the .py extension."],["print()","The built-in instruction that shows something on the screen."],["string","Text data, written inside quotes."]]},

{id:"n9",no:"0.9",t:"The Python prompt",m:40,w:"prompts",
 why:"The Python prompt lets you try one line and see the answer straight away. Programmers test small ideas there all the time.",
 L:["If you run <code>python</code> (or <code>python3</code>) with no file name, Python starts in <b>interactive mode</b>. This is also called the <b>REPL</b>: Read, Evaluate, Print, Loop. Python reads your line, works it out, prints the result, and waits for the next line.",
  "The prompt <code>&gt;&gt;&gt;</code> means “type Python here”. A second prompt, <code>...</code>, means Python is waiting for more lines.",
  "PyCharm has a built-in Python Console that works in a similar way.",
  "The REPL <b>echoes</b> results: it shows the value of what you typed without being asked. A script does not. In a script you need <code>print()</code>.",
  "To leave, type <code>exit</code> and press Enter. You are then back at the shell prompt.",
  "Watch which prompt you see. <code>&gt;&gt;&gt;</code> is Python. <code>PS C:\\...&gt;</code>, <code>%</code> and <code>$</code> are the shell."],
 an:"The REPL is a conversation with a calculator. A script is a letter you write first and post afterwards.",
 ex:{t:"A short conversation with Python",code:"$ python\n>>> 2 + 3\n5\n>>> \"hi\"\n'hi'\n>>> print(\"hi\")\nhi\n>>> exit\n$",walk:["python with no file name starts interactive mode.","The sum is worked out and echoed.","A string is echoed with quotes around it. That is how Python displays a text value.","print shows the text without quotes.","exit takes you back to the shell."]},
 P:[{q:"You type this at the Python prompt. What appears?",code:">>> 10 - 4",o:["6","Nothing","10 - 4"],c:0,y:"The REPL works it out and echoes the result. The same line alone in a script would show nothing."},
  {q:"At the Python prompt, what is the difference between these two?",code:">>> \"cat\"\n>>> print(\"cat\")",o:["No difference","The first shows 'cat' with quotes, the second shows cat","The first is an error"],c:1,y:"Echo shows the value with quotes. print shows only the text."},
  {q:"You type print(\"hi\") at the shell prompt, not at the Python prompt. What happens?",o:["hi","An error","'hi'"],c:1,y:"The shell does not understand Python code. The wording of the error depends on your shell.",x:"Treating the two prompts as the same place."}],
 Q:[{q:"What does REPL stand for?",o:["Run Every Program Later","Read, Evaluate, Print, Loop","Repeat Python Line","Remote Python"],c:1,h:"Four steps, repeated.",e:"It reads your line, evaluates it, prints the result and loops."},
  {q:"What does the ... prompt mean?",o:["An error","Python expects more lines","The program finished","It is loading"],c:1,h:"It appears in the middle of something.",e:"Python is waiting for you to finish what you started."},
  {q:"How do you leave the Python prompt?",o:["Type exit","Type stop","Type bye","You can only close the window"],c:0,h:"The word means “way out”.",e:"exit returns you to the shell. Older versions of Python need exit() with brackets."},
  {q:"Spot the bug: you typed python hello.py at the >>> prompt and got “SyntaxError: invalid syntax”. Why?",o:["The file is broken","A shell command was typed into Python","Python is too old","It needs quotes"],c:1,h:"Which prompt were you at?",e:"python hello.py is a shell command. At the Python prompt, Python expects Python code."}],
 T:[{p:"Use the Python prompt to work out 365 × 24.",h:["Which symbol multiplies?","It is the * symbol.","Estimate the answer first, then type 365 * 24 and compare."]},
  {p:"Go into the Python prompt and leave it three times, naming the prompt you see each time.",h:["What starts Python?","python or python3 to go in, exit to leave.","Say the prompt’s name out loud before each command."]}],
 M:[["Mixing the two worlds.","You get a SyntaxError in Python, or “not recognized” in the shell. Check the prompt first."],["Expecting a script to echo results.","In a script, use print()."]],
 G:[["interactive mode","Python running one line at a time as you type."],["REPL","Read, Evaluate, Print, Loop: another name for interactive mode."],["echo","The REPL showing a result without being asked."],["evaluate","To work out the value of something."]]}
];

export const CHECK=[
{q:"Which survives when the power goes off?",o:["What is in RAM","What is in storage","Both","Neither"],c:1,h:"Think of the Save button.",e:"Storage keeps data without power. RAM is wiped."},
{q:"Which command shows the folder you are in?",o:["ls","pwd","cd","mkdir"],c:1,h:"Print working directory.",e:"pwd prints the current working directory."},
{q:"You are in /home/ana/code. Where does ../data/file.txt point?",o:["/home/ana/data/file.txt","/home/ana/code/data/file.txt","/home/data/file.txt","/data/file.txt"],c:0,h:"Two dots go up one level.",e:"Up to /home/ana, then down into data."},
{q:"An algorithm with no stop condition…",o:["finishes early","never finishes","runs faster","is still fine"],c:1,h:"When does it end?",e:"Without a stop condition it runs for ever."},
{q:"What does print(\"4 * 2\") show?",o:["8","4 * 2","An error","Nothing"],c:1,h:"Look at the quotes.",e:"Quotes make it text, so it is shown as written."},
{q:"You put 7 * 6 on a line by itself in a script and run it. What appears?",o:["42","7 * 6","Nothing","An error"],c:2,h:"Does a script echo?",e:"Only the REPL echoes. A script needs print()."},
{q:"What does the command python3 --version tell you?",o:["Whether PyCharm is installed","Which version of Python is installed","How fast the computer is","Which folder you are in"],c:1,h:"Most programs report this when asked.",e:"It prints the version of the Python interpreter, such as Python 3.15.2. Seeing a version number proves Python is installed."},
{q:"What is wrong with print(\"Hi) ?",o:["Nothing","The closing quote is missing","It needs a capital P","It needs a semicolon"],c:1,h:"Count the quote marks.",e:"The string was opened but never closed."},
{q:"Which of these is an input device?",o:["Microphone","Speaker","Monitor","Printer"],c:0,h:"Which one sends information in?",e:"A microphone sends sound into the computer."},
{q:"python hello.py says “No such file or directory”. What do you ask first?",o:["Is Python broken?","Am I in the right folder?","Is the file too big?","Is the internet off?"],c:1,h:"It is a path problem.",e:"Run pwd and ls to see where you are and what is there."}
];

export const PROJECT={checks:["I made the folders python_course and level0 from the terminal","The script has at least five print lines","One line prints the result of a sum, with no quotes","It runs in PyCharm","It runs from the terminal with python hello_me.py","I predicted the output before running it, and I can explain every line"],
 hints:["Build the folder first and check where you are with pwd.","One print per line. Text goes in quotes. Sums go without quotes.","For the sum, try something like your weekly study hours: three hours on five days plus ten hours on two days. Predict the result before you run it."]};

export const ERRORS=[
["SyntaxError: unterminated string literal (detected at line 1)","A quote was opened but never closed.","Where does my text start and end?"],
["SyntaxError: '(' was never closed","An opening bracket has no partner.","Which bracket did I leave open?"],
["SyntaxError: invalid character '“' (U+201C)","A curly quote from a document got into the code.","Did I paste this from somewhere? Retype the quote marks."],
["python: can't open file '...hello.py': [Errno 2] No such file or directory","The terminal is not in the folder that holds the file.","Where am I (pwd), and what is here (ls)?"],
["command not found: python   or   'python' is not recognized","The shell cannot find Python under that name.","Should it be python3? Did I open a new terminal after installing?"],
["cd: no such file or directory: some_name","The folder name does not match anything here.","Did I spell it exactly? Am I in the right place?"],
["SyntaxError: invalid syntax   (after typing a shell command at >>>)","A shell command was typed into Python.","Which prompt am I at?"]
];

export const LATER=[
[1,"Data, variables and types",30,["Bits and bytes","Counting in binary","ASCII","Unicode and UTF-8","Arithmetic","Variables","Data types","Joining text","Asking for input","Converting types","Decimal surprises","Comments and naming"]],
[2,"True, false and decisions",28,["Comparisons","and, or, not","if","if and else","if, elif, else","Nesting","Indentation","Flowcharts","Truthiness"]],
[3,"Loops, tracing and pseudocode",38,["while loops","for loops and range","Looping over text","Running totals","break and continue","Loops inside loops","Infinite loops","Trace tables","Pseudocode","Milestone: number guessing game"]],
[4,"Functions and the call stack",38,["Built-in functions","Writing a function","Parameters and arguments","return and print","Default values","Scope","Docstrings","Combining functions","The call stack","Breaking problems down"]],
[5,"Text, lists and dictionaries",45,["Strings","Lists","Tuples","Sets","Dictionaries","Choosing a structure","Changeable or not","Two names, one list","How lists and dictionaries work inside","Milestone: grade book"]],
[6,"Errors and debugging",30,["Kinds of error","Reading an error report","Common error types","A debugging method","The step debugger","Rubber-duck debugging","try and except","raise","Simple tests"]],
[7,"Modules, files and Git",45,["Importing","The standard library","Your own module","Installing packages","Virtual environments","Reading and writing files","Paths in Python","CSV files","Version control","Starting with Git","Saving snapshots","Ignoring files","GitHub","Working in larger projects"]],
[8,"Speed, searching and sorting",32,["Counting steps","Time and space","Big-O","Common growth rates","Linear search","Binary search","Bubble sort","Selection sort","Insertion sort","Timing code"]],
[9,"Objects and classes",32,["Why objects","Classes and instances","Setting up an object","Methods","Printing objects","Lists of objects","Inheritance","Encapsulation","When not to use a class"]],
[10,"Recursion and data structures",42,["Recursion","Tracing recursion","Recursion or loops","Merge sort","Stacks","Queues","Linked lists","A small hash table","Binary search trees","Milestone: library system"]],
[11,"Capstone and review",20,["Planning a project","Writing a README","Testing checklist","Mixed review","Capstone: personal finance tracker"]]
];



/* ---------- Level 1 lessons written so far ---------- */
export const NODES1=[
{id:"m1",no:"1.1",t:"Bits and bytes",m:35,w:"bits",
 why:"Every photo, message and program on a computer is stored as nothing more than on and off. Knowing how that works explains file sizes and memory sizes, and later on, why text and numbers behave differently.",
 L:["Remember the RAM cells from the lesson on memory. Each cell either holds a charge or it does not: on or off. That single on-or-off choice is called a <b>bit</b>. Off is written 0 and on is written 1.",
  "One bit can only say two things, so on its own it can answer a yes-or-no question and nothing more. To say more, you put several bits side by side. Each arrangement of 0s and 1s is called a <b>pattern</b>.",
  "Every extra bit doubles the number of patterns, because each existing pattern can now end in either 0 or 1. One bit gives 2 patterns, two bits give 4, three give 8, four give 16.",
  "Computers group bits in eights. A group of 8 bits is a <b>byte</b>, and it can make 256 different patterns. One byte is enough to stand for a number from 0 to 255, or for one letter of plain English text.",
  "Bigger sizes are just bytes counted in bulk. A <b>kilobyte</b> (KB) is about a thousand bytes, a <b>megabyte</b> (MB) about a million, and a <b>gigabyte</b> (GB) about a billion."],
 an:"A bit is a light switch: on or off. One switch can only signal yes or no. A row of eight switches can show 256 different arrangements, which is enough to give every letter its own.",
 ex:{t:"All the patterns three bits can make",code:"000\n001\n010\n011\n100\n101\n110\n111",walk:["Start with the four two-bit patterns: 00, 01, 10, 11.","Put a 0 in front of each one. That gives four patterns.","Put a 1 in front of each one. That gives four more.","Four plus four is eight. Adding one bit doubled the count."]},
 P:[{q:"Three bits make 8 patterns. How many do four bits make?",o:["9","12","16"],c:2,y:"Each extra bit doubles the count, so 8 becomes 16.",x:"12, from adding 4 instead of doubling."},
  {q:"How many patterns can one byte (8 bits) make?",o:["16","64","256"],c:2,y:"Keep doubling: 2, 4, 8, 16, 32, 64, 128, 256.",x:"16, from multiplying 8 by 2 once instead of doubling eight times."},
  {q:"The word Hello is saved as plain text, one byte per letter. How many bits is that?",o:["5","40","256"],c:1,y:"Five letters take 5 bytes, and each byte is 8 bits. 5 × 8 = 40."}],
 Q:[{q:"What is a bit?",o:["A group of eight switches","One value that can only be 0 or 1","A small byte","A kind of file"],c:1,h:"Think of a single light switch.",e:"A bit is a single on-or-off value, written as 0 or 1."},
  {q:"How many bits are in a byte?",o:["2","4","8","10"],c:2,h:"Computers group bits in this number.",e:"A byte is 8 bits."},
  {q:"You add one more bit to a row of bits. What happens to the number of patterns?",o:["It goes up by one","It goes up by two","It doubles","It stays the same"],c:2,h:"Every old pattern can now end in 0 or in 1.",e:"Each extra bit doubles the number of patterns."},
  {q:"Spot the mistake: “Two bits can make only two patterns, because there are two of them.”",o:["The statement is correct","Wrong: two bits make four patterns","Wrong: two bits make eight patterns","Wrong: two bits make one pattern"],c:1,h:"Write them out: 00, 01, and so on.",e:"Two bits make four patterns: 00, 01, 10 and 11."}],
 T:[{p:"Write out all 16 patterns that four bits can make.",h:["How did you get from two bits to three?","Take the eight three-bit patterns and add one more bit in front.","Write the eight patterns with a 0 in front, then the same eight with a 1 in front."]},
  {p:"Find a file on your computer, look up its size, and work out roughly how many bytes that is.",h:["Where does your computer show the size of a file?","On a Mac, select the file and press Command and I. On Windows, right-click it and choose Properties.","If it says 2 MB, that is about 2 million bytes. If it says 300 KB, about 300 thousand."]}],
 M:[["Thinking each extra bit adds a fixed number of patterns.","It doubles them. Going from 3 bits to 4 goes from 8 to 16, not from 8 to 10."],["Mixing up bits and bytes.","A byte is the bigger one: 8 bits. File and memory sizes are given in bytes."]],
 G:[["bit","One value that can only be 0 or 1. The smallest piece of data."],["pattern","One arrangement of 0s and 1s."],["byte","A group of 8 bits. It can make 256 patterns."],["kilobyte, megabyte, gigabyte","About a thousand, a million and a billion bytes."]]},
{id:"m2",no:"1.2",t:"Counting in binary",m:40,w:"binary",
 why:"A pattern of bits is only useful once it stands for something. The first thing it can stand for is a number, and every other kind of data, such as letters, colours and sound, is built on top of that.",
 L:["In everyday numbers, each position is worth ten times the one to its right: ones, tens, hundreds. So 345 means 3 hundreds, 4 tens and 5 ones. This system is called <b>decimal</b>, or base 10.",
  "<b>Binary</b>, or base 2, works the same way, except each position is worth two times the one to its right: 1, 2, 4, 8, 16 and so on. That is the same doubling you saw with patterns.",
  "To read a binary number, write the position values above the bits, then add up the values that sit above a 1. For <code>1011</code> the values are 8, 4, 2 and 1, so it is 8 + 2 + 1 = 11.",
  "To write a number in binary, work from the biggest position down and ask each time: does this value fit into what is left? If it fits, write 1 and subtract it. If it does not, write 0.",
  "With 4 bits the largest number is <code>1111</code>, which is 8 + 4 + 2 + 1 = 15. There are 16 patterns, but counting starts at 0, so they cover 0 to 15. In the same way, one byte covers 0 to 255."],
 an:"Think of four coins worth 8, 4, 2 and 1. Each coin is either on the table or not. Every amount from 0 to 15 can be paid in exactly one way.",
 ex:{t:"Writing 13 in binary",code:"13    8 fits       write 1    left over 5\n 5    4 fits       write 1    left over 1\n 1    2 is too big write 0    left over 1\n 1    1 fits       write 1    left over 0\n\n13 is 1101",walk:["Start with the biggest position value that could fit: 8.","8 fits into 13, so write 1. That leaves 5.","4 fits into 5, so write 1. That leaves 1.","2 does not fit into 1, so write 0.","1 fits into 1, so write 1. Nothing is left.","Check by reading it back: 8 + 4 + 1 = 13."]},
 P:[{q:"What number is the binary pattern 110?",o:["3","6","110"],c:1,y:"The positions are worth 4, 2 and 1. The 4 and the 2 are on, so 4 + 2 = 6.",x:"3, from reading the position values in the wrong direction."},
  {q:"What number is 1011?",o:["11","13","7"],c:0,y:"8 + 2 + 1 = 11. The 4 is switched off.",x:"13, from putting the 0 in the wrong position."},
  {q:"What is the largest number that 4 bits can hold?",o:["15","16","8"],c:0,y:"1111 is 8 + 4 + 2 + 1 = 15. There are 16 patterns, but the first one is 0.",x:"16. That is the number of patterns, not the largest value."}],
 Q:[{q:"In binary, how much is each position worth compared with the one to its right?",o:["The same","Twice as much","Ten times as much","Half as much"],c:1,h:"1, 2, 4, 8.",e:"Each position is worth double the one to its right."},
  {q:"Which of these is the number 10 written in binary?",o:["1010","1100","0110","1001"],c:0,h:"8 fits into 10. What is left?",e:"8 fits, leaving 2. 4 does not fit. 2 fits. 1 does not. So 1010."},
  {q:"What number is 0111?",o:["7","8","14","3"],c:0,h:"Add the values above each 1: 4, 2 and 1.",e:"4 + 2 + 1 = 7."},
  {q:"Spot the mistake: “One byte can hold any number from 1 to 256.”",o:["The statement is correct","Wrong: it holds 0 to 255","Wrong: it holds 0 to 256","Wrong: it holds 1 to 255"],c:1,h:"Counting starts with every bit off.",e:"A byte has 256 patterns, and the first is 00000000, which is 0. So the range is 0 to 255."}],
 T:[{p:"Write your age in binary, then read it back to check.",h:["Which position values will you need? Keep doubling until you pass your age.","Start from the biggest value that fits, and work down.","For example, 19: 16 fits (3 left), 8 no, 4 no, 2 fits (1 left), 1 fits. That is 10011."]},
  {p:"Count from 0 to 15 in binary on paper, one line per number.",h:["You already listed four-bit patterns in the lesson on bits and bytes.","Put them in order, starting at 0000.","0000, 0001, 0010, 0011, and carry on. The last one is 1111."]}],
 M:[["Reading the position values in the wrong direction.","The rightmost bit is always worth 1. The values double as you move left."],["Confusing the number of patterns with the largest value.","Four bits make 16 patterns, but the values run from 0 to 15."]],
 G:[["decimal","The everyday number system, base 10, where each position is worth ten times the one to its right."],["binary","The number system computers use, base 2, where each position is worth two times the one to its right."],["position value","How much a digit is worth because of where it sits."]]},
{id:"m3",no:"1.3",t:"ASCII: letters as numbers",m:35,w:"ascii",
 why:"Every message you type is stored as numbers. Knowing that explains why capital and small letters are different to a computer, and why the text “5” is not the same thing as the number 5.",
 L:["A computer can only store numbers. To store text, it gives every character a number and stores that number in binary. A <b>character</b> is a single letter, digit, space or punctuation mark.",
  "For this to work, everyone has to use the same table. The classic one is <b>ASCII</b> (say “ask-ee”). It gives a number to each English letter, digit and common symbol, and each number fits in one byte.",
  "The letters run in order: A is 65, B is 66, C is 67. Capital and small letters are different characters, so they have different numbers: a is 97. Even a space has a number: 32.",
  "Digits are characters too. The character <code>\"5\"</code> has the number 53 in the table. That is not the same as the number 5. One is a piece of text, the other is a quantity.",
  "Python can show you the table. <code>ord(\"A\")</code> gives the number for a character, and <code>chr(65)</code> gives the character for a number."],
 an:"A code book where A is 65, B is 66 and so on. Both people need the same book, or the message cannot be read.",
 ex:{t:"Looking up characters at the Python prompt",code:">>> ord(\"A\")\n65\n>>> ord(\"a\")\n97\n>>> chr(68)\n'D'\n>>> ord(\" \")\n32\n>>> ord(\"5\")\n53",walk:["ord gives the number for a character. A is 65.","Small a is a different character: 97.","chr goes the other way. 68 is D.","Even a space has a number: 32.","The character 5 is stored as 53. It is text, not the quantity five."]},
 P:[{q:"A is 65, B is 66 and C is 67. Which numbers are stored for the word CAB?",o:["67, 65, 66","3, 1, 2","65, 66, 67"],c:0,y:"C is 67, A is 65 and B is 66, in the order the letters appear.",x:"65, 66, 67, from putting the numbers in counting order instead of the order of the letters."},
  {q:"What does this show?",code:">>> chr(68)",o:["'D'","68","'68'"],c:0,y:"chr turns a number into its character. 68 is D, and the prompt shows text with quotes."},
  {q:"What does this show?",code:">>> ord(\"5\")",o:["5","53","An error"],c:1,y:"The character 5 has the number 53 in the ASCII table. It is text, not the quantity five.",x:"5. That mixes up the character with the number."}],
 Q:[{q:"Why do computers need a table like ASCII?",o:["To make text bigger","Because they can only store numbers, so each character needs one","To check spelling","To make programs faster"],c:1,h:"What can a computer actually store?",e:"A computer stores only numbers, so every character is given a number that everyone agrees on."},
  {q:"A is 65. What is E?",o:["66","68","69","70"],c:2,h:"The letters run in order: A, B, C, D, E.",e:"A is 65, B 66, C 67, D 68 and E 69."},
  {q:"Which statement is true?",o:["A and a are stored as the same number","A and a are stored as different numbers","Small letters are not in the table","Capital letters take two bytes"],c:1,h:"Remember what ord gave for a small a.",e:"A is 65 and a is 97. They are different characters."},
  {q:"Spot the mistake: “The character 7, in quotes, is stored as the number 7.”",o:["The statement is correct","Wrong: it is stored as the character’s own number from the table","Wrong: digits cannot be stored as text","Wrong: it is stored as 70"],c:1,h:"Think of what ord gave for the character 5.",e:"Digit characters have their own numbers in the table. The character 7 is 55, not 7."}],
 T:[{p:"Use ord to find the numbers for the letters of your first name.",h:["Which prompt do you need?","Start Python, then use ord with one letter in quotes.","For example ord(\"S\"), then the next letter, and so on."]},
  {p:"The numbers 72 and 105 spell a short word. Use chr to find it.",h:["Which instruction turns a number into a character?","chr goes from a number to a character.","Try chr(72) and then chr(105)."]}],
 M:[["Thinking a capital and a small letter are the same character.","They have different numbers: A is 65 and a is 97."],["Thinking the text 5, in quotes, is the number 5.","In quotes it is a character with its own number, 53."]],
 G:[["character","A single letter, digit, space or punctuation mark."],["ASCII","A table that gives a number to each English letter, digit and common symbol."],["ord()","The Python instruction that gives the number for a character."],["chr()","The Python instruction that gives the character for a number."]]},
{id:"m4",no:"1.4",t:"Unicode and UTF-8",m:35,w:"utf8",
 why:"ASCII only covers English. Unicode is the reason one message can mix English, Tamil, Arabic and emoji, and UTF-8 is why some characters take more space than others.",
 L:["One byte has 256 patterns, so a one-byte table can never cover more than 256 characters. The world’s writing systems need far more than that.",
  "<b>Unicode</b> is one very large table that gives every character in every language its own number. It has room for over a million characters, and more than 150,000 are in use.",
  "The first 128 numbers in Unicode are the same as ASCII, so A is still 65, and plain English text is stored exactly as before.",
  "A number bigger than 255 cannot fit in one byte. <b>UTF-8</b> is the rule for storing Unicode numbers as bytes. It uses one byte for the ASCII characters, and two, three or four bytes for everything else.",
  "Python uses Unicode, so <code>ord()</code> and <code>chr()</code> work for any character, in any language."],
 an:"ASCII is a phrase book for one language. Unicode is a dictionary of every language, and UTF-8 is the rule for how much shelf space each entry takes.",
 ex:{t:"Characters from four parts of the table",code:">>> ord(\"A\")\n65\n>>> ord(\"é\")\n233\n>>> ord(\"அ\")\n2949\n>>> ord(\"😀\")\n128512",walk:["A is 65, the same as in ASCII. It takes 1 byte.","é is 233. It is outside ASCII, so UTF-8 stores it in 2 bytes.","The Tamil letter அ is 2949, stored in 3 bytes.","The emoji is 128512, stored in 4 bytes."]},
 P:[{q:"If every character had to fit in one byte, how many different characters could there be?",o:["128","256","1,000"],c:1,y:"One byte makes 256 patterns, and each character needs its own.",x:"128. That is how many ASCII defines, but a byte has room for 256."},
  {q:"In Unicode, what number does the letter A have?",o:["1","65","It changes"],c:1,y:"The first 128 Unicode numbers match ASCII, so A is still 65."},
  {q:"How many bytes does the two-character text A😀 take in UTF-8?",o:["2","5","8"],c:1,y:"A takes 1 byte and the emoji takes 4. 1 + 4 = 5.",x:"2, from counting characters instead of bytes."}],
 Q:[{q:"Why was ASCII not enough?",o:["It was too slow","It only has room for English letters, digits and symbols","It could not store numbers","It used too many bytes"],c:1,h:"Think about other languages and emoji.",e:"ASCII covers English only. Other scripts and emoji need many more numbers."},
  {q:"What is Unicode?",o:["A faster kind of byte","One table with a number for every character in every language","A programming language","A way to shrink files"],c:1,h:"It replaces many small tables with one.",e:"Unicode gives every character, in every script, its own number."},
  {q:"What does UTF-8 decide?",o:["Which language you are typing","How each Unicode number is stored as bytes","The colour of the text","How fast text is shown"],c:1,h:"Unicode gives the number. Something else has to store it.",e:"UTF-8 is the rule for turning Unicode numbers into one to four bytes."},
  {q:"Spot the mistake: “Every character takes exactly one byte.”",o:["The statement is correct","Wrong: only the ASCII characters take one byte in UTF-8","Wrong: every character takes four bytes","Wrong: characters are not stored as bytes"],c:1,h:"Think of the emoji.",e:"In UTF-8 the ASCII characters take one byte. Others take two, three or four."}],
 T:[{p:"Use ord on a character from a language other than English, or on an emoji of your choice.",h:["How do you type or paste that character?","On a Mac, pressing Control, Command and Space opens the emoji and symbol picker.","Paste the character between the quotes inside ord."]},
  {p:"Use chr to find out which character has the number 8377.",h:["Which instruction goes from a number to a character?","chr does.","Type chr(8377) at the Python prompt."]}],
 M:[["Thinking one character always means one byte.","That is only true for the ASCII characters. Others take up to four bytes."],["Thinking Unicode and UTF-8 are the same thing.","Unicode is the table of numbers. UTF-8 is how those numbers are stored as bytes."]],
 G:[["Unicode","One table that gives every character in every language its own number."],["UTF-8","The rule for storing Unicode numbers as one to four bytes."]]},
{id:"m5",no:"1.5",t:"Arithmetic",m:35,w:"ops",
 why:"Almost every program calculates something: a total, an average, a remainder. Python’s arithmetic symbols are the tools for that, and two of them do jobs a pocket calculator does not.",
 L:["An <b>operator</b> is a symbol that does a calculation. Python has seven for arithmetic.",
  "<code>+</code> adds, <code>-</code> subtracts, <code>*</code> multiplies and <code>/</code> divides. Division with one slash always gives a number with a decimal point, so <code>7 / 2</code> is 3.5 and <code>6 / 2</code> is 3.0.",
  "<code>//</code> divides and throws away the remainder, so <code>7 // 2</code> is 3. <code>%</code> gives only the remainder, so <code>7 % 2</code> is 1. Think of sharing 7 sweets between 2 people: each gets 3, and 1 is left over.",
  "<code>**</code> raises to a power. <code>7 ** 2</code> means 7 × 7, which is 49, and <code>2 ** 3</code> means 2 × 2 × 2, which is 8.",
  "When a line has several operators, Python follows the usual order: brackets first, then powers, then multiplying and dividing, then adding and subtracting. So <code>2 + 3 * 4</code> is 14, while <code>(2 + 3) * 4</code> is 20."],
 an:"Sharing sweets. Two slashes tell you how many each person gets. The percent sign tells you how many are left in the bag.",
 ex:{t:"Seven operators on the same two numbers",code:">>> 7 + 2\n9\n>>> 7 - 2\n5\n>>> 7 * 2\n14\n>>> 7 / 2\n3.5\n>>> 7 // 2\n3\n>>> 7 % 2\n1\n>>> 7 ** 2\n49",walk:["Adding, subtracting and multiplying work as you expect.","One slash divides exactly: 3.5.","Two slashes keep only the whole part: 3.","The percent sign keeps only the remainder: 1.","Two stars raise to a power: 7 × 7 is 49."]},
 P:[{q:"What does this show?",code:">>> 7 / 2",o:["3","3.5","4"],c:1,y:"A single slash gives the exact answer, with a decimal point.",x:"3. That is what two slashes would give."},
  {q:"What does this show?",code:">>> 17 % 5",o:["3","2","3.4"],c:1,y:"5 fits into 17 three times, which uses 15. The remainder is 2.",x:"3. That is 17 // 5, the number of whole times."},
  {q:"What does this show?",code:">>> 2 + 3 * 4",o:["20","14","24"],c:1,y:"Multiplying comes before adding: 3 * 4 is 12, then 2 + 12 is 14.",x:"20, from working strictly left to right."}],
 Q:[{q:"Which operator gives only the remainder?",o:["/","//","%","**"],c:2,h:"It looks like a percent sign.",e:"The percent sign gives the remainder. 7 % 2 is 1."},
  {q:"What is 2 ** 3?",o:["6","8","9","5"],c:1,h:"It means 2 multiplied by itself three times.",e:"2 × 2 × 2 = 8."},
  {q:"What does 6 / 2 give in Python?",o:["3","3.0","2","An error"],c:1,h:"A single slash always gives a decimal point.",e:"Division with one slash always gives a number with a decimal point, so the result is 3.0."},
  {q:"Spot the mistake: “(2 + 3) * 4 and 2 + 3 * 4 give the same result.”",o:["The statement is correct","Wrong: the first is 20 and the second is 14","Wrong: the first is 14 and the second is 20","Wrong: both give 24"],c:1,h:"Brackets go first.",e:"With brackets, 2 + 3 is done first: 5 * 4 = 20. Without them, 3 * 4 is done first: 2 + 12 = 14."}],
 T:[{p:"You have 50 rupees and a pen costs 12. Use two operators to find how many pens you can buy and how much money is left.",h:["Which operator counts whole times, and which gives what is left?","Use two slashes for the pens and the percent sign for the change.","Try 50 // 12 and then 50 % 12."]},
  {p:"Work out how many minutes there are in a week, in one line.",h:["How many days in a week, hours in a day, and minutes in an hour?","Multiply the three numbers together.","7 * 24 * 60"]}],
 M:[["Expecting 7 / 2 to give 3.","One slash gives 3.5. Use two slashes when you want only the whole part."],["Reading a line strictly from left to right.","Multiplying and dividing happen before adding and subtracting. Use brackets when you want a different order."]],
 G:[["operator","A symbol that does a calculation, such as + or *."],["remainder","What is left over after dividing into whole parts."],["power","A number multiplied by itself a given number of times."],["float","A number with a decimal point, such as 3.5."]]},
{id:"m6",no:"1.6",t:"Variables",m:40,w:"vars",
 why:"Without variables, a program forgets every result the moment it has shown it. Variables let a program remember values, give them meaningful names, and change them as it runs.",
 L:["A <b>variable</b> is a name that refers to a value. The value sits in the computer’s memory, and the name is a label pointing at it.",
  "You create one with the equals sign: <code>sweets = 17</code>. This is called <b>assignment</b>. It does not mean “equals” as in maths. It means “make this name refer to this value”.",
  "After that line you can use the name anywhere you would use the value, so <code>sweets // 5</code> gives 3.",
  "A variable can be given a new value. In <code>sweets = sweets + 3</code>, Python works out the right side first (17 + 3), then makes the name refer to the result, 20. The old value is forgotten.",
  "Names cannot contain spaces. Join words with an underscore, as in <code>total_amount</code>, and choose names that say what the value is.",
  "If you use a name that was never created, often because of a typo, Python stops with a <b>NameError</b>."],
 an:"A label on a locker. The locker holds the value, and the label is how you find it again. You can move the label to a different locker at any time.",
 ex:{t:"The cost of four pens",code:"price = 12\nquantity = 4\ntotal_amount = price * quantity\nprint(total_amount)",out:"48",walk:["The name price now refers to 12.","The name quantity now refers to 4.","Python works out 12 * 4 and makes total_amount refer to the result.","print shows the value that total_amount refers to."]},
 P:[{q:"At the Python prompt you type this line. What appears?",code:">>> sweets = 17",o:["17","Nothing","sweets"],c:1,y:"Assignment stores a value. There is no result to show.",x:"17. The prompt only echoes when a line has a value to show."},
  {q:"What does the last line show?",code:"sweets = 17\nsweets = sweets + 3\nprint(sweets)",o:["17","20","An error"],c:1,y:"The right side is worked out first: 17 + 3 is 20. Then sweets refers to 20.",x:"An error, from reading the equals sign in the maths sense."},
  {q:"You created sweets, then typed sweet by mistake. What happens?",o:["Python uses sweets anyway","A NameError","It shows 0"],c:1,y:"Python never guesses. The name sweet was never created, so it reports a NameError and suggests the similar name."}],
 Q:[{q:"What does the equals sign do in price = 12?",o:["It checks whether price is 12","It makes the name price refer to 12","It prints 12","It adds 12 to price"],c:1,h:"It is called assignment.",e:"It makes the name on the left refer to the value on the right."},
  {q:"After x = 5 and then x = x * 2, what is x?",o:["5","7","10","An error"],c:2,h:"Work out the right side first.",e:"5 * 2 is 10, and x now refers to 10."},
  {q:"Which of these is a good variable name?",o:["total amount","total_amount","t","12total"],c:1,h:"No spaces, and it should say what it holds.",e:"total_amount has no spaces and describes its value. A name cannot contain spaces or begin with a digit."},
  {q:"Spot the bug: a script says count = 3 and then print(cout).",o:["Nothing is wrong","The name in print is misspelled, so Python raises a NameError","print cannot show variables","count needs quotes"],c:1,h:"Compare the two names letter by letter.",e:"The name cout was never created. Python reports a NameError and suggests count."}],
 T:[{p:"Write a script that stores your age in a variable, works out your age in ten years in a second variable, and prints it.",h:["How many variables do you need?","One for your age now, and one for the result.","Create a name for your age. Then create a second name that refers to the first plus 10, and print the second."]},
  {p:"Store a price and a quantity in variables. On a later line, change the quantity, then print the new total.",h:["What happens to the old quantity when you assign a new one?","Assign quantity again, lower down, with a different number.","After changing quantity, work out the total again before you print it. A total worked out earlier does not update by itself."]}],
 M:[["Reading the equals sign as “equals”.","Read it as “now refers to”. The right side is worked out first."],["Using a name before creating it, or misspelling it.","Python raises a NameError. Check the spelling against the line where the name was created."]],
 G:[["variable","A name that refers to a value kept in memory."],["assignment","Making a name refer to a value, using the equals sign."],["NameError","The error Python raises when it meets a name that was never created."]]},
{id:"m7",no:"1.7",t:"Types of data",m:45,w:"types",
 why:"Every value has a type, and the type decides what you are allowed to do with it. Most beginner errors come from mixing types without noticing, so learning to see them saves a lot of confusion.",
 L:["Every value in Python has a <b>type</b>, which says what kind of thing it is. You can ask for it with <code>type()</code>.",
  "An <b>int</b> is a whole number, such as 12. A <b>float</b> is a number with a decimal point, such as 3.5. A <b>str</b>, short for string, is text in quotes, such as <code>\"hello\"</code>.",
  "A <b>bool</b> has only two possible values, <code>True</code> and <code>False</code>, written with capital letters. <code>None</code> is a special value that means “no value at all”.",
  "The type decides what an operator does. Between two numbers, <code>+</code> adds: <code>12 + 3</code> is 15. Between two strings, <code>+</code> joins them: <code>\"12\" + \"3\"</code> is <code>'123'</code>.",
  "If the types do not fit together, Python refuses to guess and stops with a <b>TypeError</b>. <code>\"12\" + 3</code> is an error, because it could mean 15 or '123'.",
  "To say what you mean, convert one side. <code>int(\"12\") + 3</code> gives 15, and <code>\"12\" + str(3)</code> gives '123'."],
 an:"Types are like units. You can add 3 metres to 2 metres, but 3 metres plus 2 kilograms makes no sense until you say what you mean.",
 ex:{t:"The same plus sign, three outcomes",code:">>> 12 + 3\n15\n>>> \"12\" + \"3\"\n'123'\n>>> \"12\" + 3\nTypeError: can only concatenate str (not \"int\") to str\n>>> int(\"12\") + 3\n15\n>>> \"12\" + str(3)\n'123'",walk:["Two ints: the plus sign adds.","Two strings: the plus sign joins them end to end.","A string and an int: Python will not guess, and raises a TypeError.","Converting the text to a number makes it addition.","Converting the number to text makes it joining."]},
 P:[{q:"What does this show?",code:">>> type(\"12\")",o:["<class 'int'>","<class 'str'>","<class 'float'>"],c:1,y:"The quotes make it text, even though it looks like a number.",x:"int, from looking at the digits instead of the quotes."},
  {q:"What does this show?",code:">>> type(12 / 4)",o:["<class 'int'>","<class 'float'>","<class 'str'>"],c:1,y:"Division with one slash always gives a float. The value is 3.0."},
  {q:"What does this show?",code:">>> \"12\" + 3",o:["15","'123'","A TypeError"],c:2,y:"A string and an int cannot be joined or added. Python stops and makes you say which you meant.",x:"'123'. Some languages do that, but Python refuses to guess."}],
 Q:[{q:"Which type holds text?",o:["int","float","str","bool"],c:2,h:"It is short for string.",e:"A str holds text, written in quotes."},
  {q:"What do you get from joining the strings \"12\" and \"3\" with a plus sign?",o:["15","'123'","An error","'15'"],c:1,h:"Both sides are strings.",e:"Between two strings the plus sign joins them: '123'."},
  {q:"Which line gives the number 15?",o:["\"12\" + 3","int(\"12\") + 3","\"12\" + str(3)","str(12) + 3"],c:1,h:"Both sides must be numbers.",e:"int turns the text into the number 12, and 12 + 3 is 15."},
  {q:"Spot the mistake: “true, in small letters, is a bool in Python.”",o:["The statement is correct","Wrong: it must be written True, with a capital T","Wrong: bools are written in quotes","Wrong: Python has no bool type"],c:1,h:"Python is case-sensitive.",e:"The two bool values are True and False, with capitals. A small-letter true is an unknown name and gives a NameError."}],
 T:[{p:"Use type to check five values of your choice, including at least one of each type you know.",h:["Which types have you met?","int, float, str, bool, and the special value None.","For example type(7), type(7.0), type(\"7\"), type(True) and type(None)."]},
  {p:"You have the text \"25\" and the number 5. Write one line that gives 30, and another that gives '255'.",h:["Which result needs both sides to be numbers?","Convert the text for the sum, and convert the number for the joining.","Use int on the text to get 30, and str on the number to get '255'."]}],
 M:[["Thinking digits in quotes are a number.","Quotes always make a string. Check with type."],["Expecting Python to convert types for you.","It will not guess. Convert with int, float or str."]],
 G:[["type","What kind of thing a value is, such as int or str."],["int","A whole number."],["str","Text, written in quotes. Short for string."],["bool","A value that is either True or False."],["None","A special value meaning “no value at all”."],["TypeError","The error Python raises when an operation is given types it cannot combine."],["concatenate","To join strings end to end."]]},
{id:"m8",no:"1.8",t:"Joining text and values",m:35,w:"fstr",
 why:"Programs constantly build sentences that include values: a total, a name, a score. There are three ways to do it, and one of them, the f-string, is the one you will use every day.",
 L:["Joining text with <code>+</code> only works between strings. To include a number you must convert it first: <code>\"I have \" + str(sweets) + \" sweets\"</code>. You also have to add every space yourself.",
  "<code>print</code> accepts several values separated by commas. It converts each one to text and puts a space between them: <code>print(\"I have\", sweets, \"sweets\")</code>.",
  "An <b>f-string</b> is a string with the letter f just before the opening quote. Anything inside curly brackets is worked out and placed into the text: <code>f\"I have {sweets} sweets\"</code>.",
  "The brackets can hold a calculation as well as a name, so <code>f\"Each gets {sweets // 5}\"</code> works.",
  "If you forget the f, Python prints the curly brackets and the name exactly as typed. There is no error message, so this mistake is easy to miss."],
 an:"An f-string is a form letter with blanks. The curly brackets are the blanks, and Python fills them in when the line runs.",
 ex:{t:"Three ways to say the same thing",code:"sweets = 17\nprint(\"I have \" + str(sweets) + \" sweets\")\nprint(\"I have\", sweets, \"sweets\")\nprint(f\"I have {sweets} sweets\")",out:"I have 17 sweets\nI have 17 sweets\nI have 17 sweets",walk:["Joining with the plus sign: the number is converted with str, and the spaces are inside the quotes.","Commas in print: each value is converted for you, and a space is added between them.","An f-string: the value is dropped in where the curly brackets are.","All three print the same sentence. The f-string is the easiest to read."]},
 P:[{q:"With sweets = 17, what does this print?",code:"print(\"I have \" + sweets + \" sweets\")",o:["I have 17 sweets","A TypeError","I have sweets sweets"],c:1,y:"The plus sign cannot join a string to an int. The number has to be converted with str first."},
  {q:"With sweets = 17, what does this print?",code:"print(\"I have {sweets} sweets\")",o:["I have 17 sweets","I have {sweets} sweets","An error"],c:1,y:"The f is missing, so the curly brackets are ordinary characters and are printed as typed.",x:"I have 17 sweets, from not noticing the missing f."},
  {q:"What does this print?",code:"print(\"a\", \"b\", \"c\", sep=\"-\")",o:["a b c","a-b-c","a, b, c"],c:1,y:"sep sets what goes between the values. The default is a space, and here it is a hyphen.",x:"a, b, c. The commas in the code separate the values. They are not printed."}],
 Q:[{q:"What makes a string an f-string?",o:["Curly brackets inside it","The letter f just before the opening quote","Ending it with f","Using single quotes"],c:1,h:"It is one letter, before the quote.",e:"The f goes immediately before the opening quote."},
  {q:"With price = 12, what does print(f\"Cost: {price * 2}\") show?",o:["Cost: {price * 2}","Cost: 24","Cost: 12 * 2","An error"],c:1,h:"The brackets can hold a calculation.",e:"Python works out 12 * 2 and puts 24 into the text."},
  {q:"Which way of combining text and a number needs you to convert the number yourself?",o:["Joining with a plus sign","Commas in print","An f-string","None of them"],c:0,h:"Which one raised a TypeError?",e:"Joining with a plus sign only works between strings, so the number must go through str first."},
  {q:"Spot the bug: print(\"Total: {total}\") shows the brackets instead of the value.",o:["total needs quotes","The f before the opening quote is missing","print cannot show variables","The brackets should be round"],c:1,h:"Compare it with a working f-string.",e:"Without the f it is an ordinary string, so the brackets are printed as typed."}],
 T:[{p:"Store your name and your favourite number in two variables, then print one sentence containing both, using an f-string.",h:["How many pairs of curly brackets will you need?","One pair for each variable.","Start the string with f, and put each variable name inside its own curly brackets."]},
  {p:"Print the result of 10 divided by 3 so that it shows exactly two digits after the decimal point.",h:["What can go inside the curly brackets after the value?","A colon, followed by a format.","Inside the brackets, write the calculation and then :.2f"]}],
 M:[["Forgetting the f.","The brackets are printed as typed, with no error. Check for the f whenever you see curly brackets in your output."],["Forgetting spaces when joining with a plus sign.","The plus sign adds nothing of its own. Put the spaces inside the quotes."]],
 G:[["f-string","A string with f before the opening quote, in which anything inside curly brackets is replaced by its value."],["sep","A setting of print that says what goes between the values. The default is a space."]]},
{id:"m9",no:"1.9",t:"Asking the user a question",m:30,w:"ask",
 why:"A program that never takes input does the same thing every time. input lets a program respond to the person using it. It is the “input” step of input, processing, output.",
 L:["<code>input()</code> pauses the program, shows a message, and waits for the user to type something and press Return.",
  "Whatever was typed comes back as a value, which you normally store in a variable: <code>name = input(\"What is your name? \")</code>.",
  "The value is always a <b>str</b>, even when the user types only digits. Typing 25 gives the text <code>\"25\"</code>, not the number 25.",
  "The message is optional, and its spacing is up to you. A space at the end of the message stops the answer from touching it.",
  "If the user presses Return without typing, input gives back an <b>empty string</b>: text with no characters in it, written <code>\"\"</code>."],
 an:"A form with one blank. The program hands it over, waits while you write, and takes back whatever you wrote, always as text.",
 ex:{t:"A greeting that uses the answer",code:"name = input(\"Enter your name: \")\nprint(f\"My name is {name}\")",out:"Enter your name: Ana\nMy name is Ana",walk:["The program shows the message and stops.","The user types Ana and presses Return.","input gives back the text, and name now refers to it.","The f-string puts the value into the sentence."]},
 P:[{q:"A program runs age = input(\"Age? \") and the user types 25. What type is age?",o:["int","str","float"],c:1,y:"input always gives back a str. The value is the text \"25\".",x:"int, because the user typed digits."},
  {q:"The user types 25. What does this print?",code:"age = input(\"Age? \")\nprint(age + 1)",o:["26","251","A TypeError"],c:2,y:"age is the text \"25\", and a string cannot be added to an int.",x:"26, from forgetting that input gives text."},
  {q:"The user presses Return without typing anything. What does input give back?",o:["None","An empty string","An error"],c:1,y:"It gives back text with no characters in it, written as two quotes with nothing between them."}],
 Q:[{q:"What happens while input is waiting?",o:["The program keeps running","The program is paused until the user presses Return","The program ends","It prints the answer"],c:1,h:"Think of a form being handed over.",e:"The program stops at that line until the user presses Return."},
  {q:"What type does input always give back?",o:["int","float","str","It depends on what is typed"],c:2,h:"Even digits arrive as text.",e:"Always a str, whatever the user types."},
  {q:"Why put a space at the end of the message in input(\"Name: \")?",o:["Python requires it","So the user’s answer does not touch the message","To make the program faster","To convert the answer"],c:1,h:"Look at where the typing starts.",e:"The answer appears right after the message, so the space keeps them apart."},
  {q:"Spot the bug: a script runs count = input(\"How many? \") and then print(count * 2). The user types 4, and it prints 44.",o:["Nothing is wrong","count is text, so multiplying by 2 repeats it","print cannot multiply","input needs two messages"],c:1,h:"What does a string times a whole number do?",e:"count is the text \"4\". A string times 2 repeats it, giving 44. It needs converting with int first."}],
 T:[{p:"Ask the user for their favourite food and print a sentence that includes the answer.",h:["Where does the answer go once the user has typed it?","Store it in a variable.","Store the result of input in a variable, then use that name inside the curly brackets of an f-string."]},
  {p:"Run a script with input and press Return without typing. Print the answer between two square brackets to see what came back.",h:["How can you make an invisible value visible?","Put something visible on each side of it.","Use an f-string with a square bracket before and after the curly brackets."]}],
 M:[["Doing arithmetic with the answer straight away.","The answer is text. Convert it with int or float first."],["Forgetting the space at the end of the message.","The typing starts immediately after the message, so the two run together."]],
 G:[["input()","The instruction that pauses the program and gives back what the user types, as a string."],["empty string","Text with no characters in it, written as two quotes with nothing between them."]]},
{id:"m10",no:"1.10",t:"Converting between types",m:40,w:"cast",
 why:"Input arrives as text, but calculations need numbers. Converting between types is how the two meet, and knowing how a conversion fails is what stops a program crashing on its first unexpected answer.",
 L:["Three instructions convert a value to another type: <code>int()</code> gives a whole number, <code>float()</code> gives a number with a decimal point, and <code>str()</code> gives text.",
  "The usual pattern is to wrap the input: <code>age = int(input(\"What is your age? \"))</code>. The inner part runs first and gives text. The outer part turns it into a number.",
  "A conversion only works if the text really looks like that kind of number. <code>int(\"abc\")</code> stops with a <b>ValueError</b>. So does <code>int(\"3.5\")</code>, because 3.5 is not a whole number, and so does <code>int(\"\")</code>.",
  "Given a float, <code>int()</code> cuts off everything after the point. It does not round: <code>int(3.9)</code> is 3.",
  "<code>str()</code> always works. Every value can be turned into text."],
 an:"Changing money at a counter. Notes of the right kind are exchanged without fuss. Hand over something that is not money at all, and the clerk refuses.",
 ex:{t:"Next year’s age",code:"age = int(input(\"What is your age? \"))\nprint(f\"My age for next year will be {age + 1}.\")",out:"What is your age? 21\nMy age for next year will be 22.",walk:["input gives back the text \"21\".","int turns it into the number 21, and age refers to that.","age + 1 is real arithmetic, giving 22.","The f-string puts the result into the sentence."]},
 P:[{q:"What does this give?",code:">>> int(\"abc\")",o:["0","A ValueError","A TypeError"],c:1,y:"The type is fine, a string, but its content cannot be read as a whole number. That is a ValueError.",x:"A TypeError. That is for the wrong kind of thing, not for unusable content."},
  {q:"What does this give?",code:">>> int(3.9)",o:["4","3","An error"],c:1,y:"Given a float, int cuts off the decimal part. It does not round.",x:"4, from expecting it to round."},
  {q:"What does this give?",code:">>> int(\"3.5\")",o:["3","4","A ValueError"],c:2,y:"The text is not a whole number, so int refuses it. Convert with float first, then with int."}],
 Q:[{q:"Which instruction turns the text \"3.5\" into a number?",o:["int","float","str","type"],c:1,h:"It has a decimal point.",e:"float reads text with a decimal point."},
  {q:"In int(input(\"Age? \")), which part runs first?",o:["int","input","They run together","Neither"],c:1,h:"Inside the brackets first.",e:"The inner part, input, runs first and gives text. Then int converts it."},
  {q:"What is the difference between a TypeError and a ValueError?",o:["There is none","A TypeError is the wrong kind of thing. A ValueError is the right kind with unusable content.","A ValueError is for numbers only","A TypeError only happens in files"],c:1,h:"Compare adding a string to a number with converting the text abc.",e:"Adding a string to an int mixes kinds that do not fit: a TypeError. int is allowed to take a string, but cannot use the text abc: a ValueError."},
  {q:"Spot the mistake: “int(2.9) gives 3.”",o:["The statement is correct","Wrong: it gives 2, because int cuts off the decimal part","Wrong: it gives an error","Wrong: it gives 2.0"],c:1,h:"int does not round.",e:"int removes everything after the point, so the result is 2."}],
 T:[{p:"Ask the user for two whole numbers and print their sum.",h:["What type does each answer arrive as?","Convert each answer before adding.","Wrap each input in int, store the results in two variables, then print their sum."]},
  {p:"Ask for a price that may include a decimal point, such as 12.50, and print the price of three.",h:["Which conversion accepts a decimal point?","float does.","Wrap the input in float, then multiply by 3."]}],
 M:[["Converting text that is not a number.","Python raises a ValueError. For now, type sensible answers. A later part of this course shows how to handle bad input properly."],["Expecting int to round.","It cuts off. Use round when you want the nearest whole number."]],
 G:[["convert","To turn a value of one type into another type, using int, float or str."],["ValueError","The error Python raises when a value is the right type but its content cannot be used."]]},
{id:"m11",no:"1.11",t:"When decimals misbehave",m:30,w:"floats",
 why:"Floats look like ordinary decimal numbers, but they are stored in binary and many of them are very slightly off. Knowing this stops you from writing comparisons that quietly give the wrong answer.",
 L:["A float is stored in binary, using halves, quarters, eighths and so on. A decimal such as 0.5 or 0.25 fits exactly.",
  "Many decimals do not fit. 0.1 in binary is a pattern that repeats for ever, in the same way that one third in decimal is 0.3333 and never finishes. Python keeps the closest value it can.",
  "The tiny errors show up when you calculate: <code>0.1 + 0.2</code> gives <code>0.30000000000000004</code>, so <code>0.1 + 0.2 == 0.3</code> is <code>False</code>.",
  "Never use two equals signs to compare floats that came out of a calculation. Round them first: <code>round(0.1 + 0.2, 2) == 0.3</code> is <code>True</code>.",
  "Whole numbers are always exact. For money, store the amount in the smallest unit as an int, such as paise or cents."],
 an:"Writing one third as a decimal. However many 3s you write, you never quite get there. A float has the same problem with a tenth.",
 ex:{t:"The same sum, checked three ways",code:">>> 0.1 + 0.2\n0.30000000000000004\n>>> 0.1 + 0.2 == 0.3\nFalse\n>>> round(0.1 + 0.2, 2) == 0.3\nTrue\n>>> 10 + 20 == 30\nTrue",walk:["The sum is very slightly more than 0.3.","So the comparison fails, with no warning.","Rounding to two digits removes the tiny error.","Whole numbers do not have this problem at all."]},
 P:[{q:"What does this give?",code:">>> 0.1 + 0.2 == 0.3",o:["True","False","An error"],c:1,y:"The sum is 0.30000000000000004, which is not equal to 0.3.",x:"True, from trusting the arithmetic you learned at school."},
  {q:"What does this give?",code:">>> 0.5 + 0.25 == 0.75",o:["True","False","An error"],c:0,y:"A half, a quarter and three quarters are all stored exactly in binary, so no error creeps in."},
  {q:"What does this give?",code:">>> round(0.1 + 0.2, 2) == 0.3",o:["True","False","0.3"],c:0,y:"Rounding to two digits removes the tiny error, so the comparison succeeds."}],
 Q:[{q:"Why is 0.1 + 0.2 not exactly 0.3 in Python?",o:["Python has a bug","0.1 and 0.2 cannot be stored exactly in binary","The plus sign rounds up","Floats are stored as text"],c:1,h:"Think of one third written as a decimal.",e:"Neither 0.1 nor 0.2 fits exactly in binary, so each is stored very slightly off, and the errors add up."},
  {q:"Which of these values is stored exactly as a float?",o:["0.1","0.2","0.5","0.3"],c:2,h:"Which one is a simple half, quarter or eighth?",e:"0.5 is one half, which binary can store exactly."},
  {q:"What is the safest way to store an amount of money?",o:["As a float","As a whole number of the smallest unit","As text","As a bool"],c:1,h:"Which type is always exact?",e:"An int is always exact, so store paise or cents as whole numbers."},
  {q:"Spot the bug: a program adds 0.1 and 0.2, then checks whether the total equals 0.3 using two equals signs. The check never passes.",o:["Nothing is wrong","Floats from a calculation should not be compared with two equals signs","The total needs quotes","0.3 is too small"],c:1,h:"What does the sum actually come to?",e:"The sum is 0.30000000000000004. Round both sides before comparing."}],
 T:[{p:"Find two more decimal sums that are not exactly what you expect.",h:["Which decimals do not fit in binary?","Try sums that involve tenths.","Try 0.1 + 0.7, or 0.1 * 3."]},
  {p:"Three items cost 12 rupees 50 paise each. Work out the total using whole numbers only, and print it in rupees and paise.",h:["What is the price of one item in paise?","Multiply in paise, then split the result into rupees and paise.","1250 * 3 gives the total in paise. Two slashes by 100 gives the rupees, and the percent sign by 100 gives the paise left over."]}],
 M:[["Comparing calculated floats with two equals signs.","Round both sides first, or use whole numbers."],["Thinking this is a fault in Python.","Almost every programming language stores decimals this way and gives the same result."]],
 G:[["floating point","The way computers store numbers with a decimal point: in binary, with limited precision."],["precision","How many digits of a number are stored accurately."]]},
{id:"m12",no:"1.12",t:"Comments and good names",m:25,w:"comments",
 why:"Code is read far more often than it is written, by other people and by you a month later. Comments and clear names are what make it readable.",
 L:["A <b>comment</b> is a note for people. It starts with <code>#</code> and runs to the end of the line. Python ignores it completely.",
  "A comment can sit on a line of its own, or after some code on the same line.",
  "Use comments to say why a line exists, not to repeat what it obviously does.",
  "Putting <code>#</code> in front of a line switches it off without deleting it. This is called <b>commenting out</b>, and it is handy while testing.",
  "A <code>#</code> inside quotes is not a comment. It is just a character in the string.",
  "For names, Python’s convention is lowercase words joined by underscores, such as <code>total_amount</code>. This style is called <b>snake case</b>."],
 an:"Notes in the margin of a recipe. The cook follows the steps and ignores the notes, but the next person to read it is glad they are there.",
 ex:{t:"Three hash signs, three outcomes",code:"# print(\"one\")\nprint(\"two\")  # print(\"three\")\nprint(\"# four\")",out:"two\n# four",walk:["Line 1 is entirely a comment, so nothing runs.","On line 2, the code before the hash runs. Everything after it is ignored.","On line 3 the hash is inside the quotes, so it is ordinary text and is printed."]},
 P:[{q:"What does this line print?",code:"# print(\"hello\")",o:["hello","Nothing","An error"],c:1,y:"The whole line is a comment, so Python ignores it."},
  {q:"What does this line print?",code:"print(\"two\")  # print(\"three\")",o:["two","two three","three"],c:0,y:"The code before the hash runs. Everything after the hash is a comment."},
  {q:"What does this line print?",code:"print(\"# four\")",o:["Nothing","four","# four"],c:2,y:"The hash is inside the quotes, so it is part of the text.",x:"Nothing, from treating every hash as the start of a comment."}],
 Q:[{q:"What does Python do with a comment?",o:["Runs it","Prints it","Ignores it","Checks its spelling"],c:2,h:"It is a note for people.",e:"Python ignores everything from the hash to the end of the line."},
  {q:"Which is the better comment for the line total = price * 100?",o:["# multiply price by 100","# Convert rupees to paise so the total stays exact","# total","# a line of code"],c:1,h:"Say why, not what.",e:"A good comment gives the reason. The code already shows what it does."},
  {q:"Which name follows Python’s convention?",o:["TotalAmount","totalamount","total_amount","total-amount"],c:2,h:"Lowercase words, joined by underscores.",e:"Snake case is lowercase words joined by underscores. A hyphen would be read as a minus sign."},
  {q:"Spot the mistake: “A hash sign always starts a comment.”",o:["The statement is correct","Wrong: inside quotes it is just a character","Wrong: only at the start of a line","Wrong: comments start with two slashes"],c:1,h:"Remember the line that printed a hash.",e:"Inside a string, a hash is ordinary text."}],
 T:[{p:"Open one of your earlier scripts and add a comment above each group of lines saying why it is there.",h:["What would you want to know if you opened this file in a month?","Explain the purpose, not the mechanics.","Write a hash, a space, and one short sentence above each step."]},
  {p:"Comment out one line of a working script, run it, and see what changes. Then switch the line back on.",h:["How do you switch a line off without deleting it?","Put a hash in front of it.","Add a hash at the start of the line, run the script, then remove the hash."]}],
 M:[["Writing comments that repeat the code.","Say why the line exists. The code already says what it does."],["Leaving a comment that no longer matches the code.","A wrong comment is worse than none. Update it when you change the line."]],
 G:[["comment","A note for people, starting with a hash sign. Python ignores it."],["commenting out","Switching a line off by putting a hash in front of it."],["snake case","The naming style of lowercase words joined by underscores."]]}
];
/* ---------- Going deeper: rules, limits and odd cases, by lesson id ---------- */
export const DEEP={
 "n2": [
  "When RAM fills up, the computer borrows disk space as slow extra memory, called swap. That is the real reason a machine with too many tabs open feels sluggish.",
  "The CPU has its own tiny, very fast memory called cache. From fastest to slowest: cache, RAM, SSD."
 ],
 "n4": [
  "A name with spaces has to be wrapped in quotes in the terminal, as in cd \"My Folder\".",
  "On Linux, Code and code are different folders. On Windows and most Macs they are treated as the same."
 ],
 "n5": [
  "A command is itself a program stored in a folder. The shell searches a list of folders called PATH, and “command not found” means the program was not in any of them.",
  "Most commands take options that start with a dash, such as ls -a. Pressing Control and C stops a command that is running."
 ],
 "n6": [
  "mv renames or moves a file or folder. mv level10 level0 fixes a wrong folder name in one step.",
  "cd on its own takes you home. rmdir -p removes a folder and then its parent, if both are empty.",
  "rm -r deletes a folder and everything in it, with no Trash and no undo. Treat it with care."
 ],
 "n8": [
  "Python handles a file in two stages. First it reads the whole file and checks the writing rules. A mistake there is a SyntaxError, and nothing runs at all.",
  "If the file passes, Python runs it line by line. An error at this stage, such as dividing by zero or a misspelled name, stops the program at that line. Earlier lines have already run.",
  "A third kind, the logic error, never shows a message. The program runs and gives a wrong answer.",
  "Exit code 0 means the program finished cleanly. Exit code 1 means an error stopped it."
 ],
 "n9": [
  "The three-dot prompt means Python thinks your line is unfinished, usually because a bracket or quote is still open. Press Control and C to cancel it.",
  "At the prompt, each line runs the moment you press Return. A file is checked as a whole first. That is why the same mistake can behave differently in the two places.",
  "Anything you create at the prompt lives in RAM and is gone when you exit. A script is saved on disk."
 ],
 "m1": [
  "Internet speeds are quoted in bits and file sizes in bytes. Divide by 8 to compare them.",
  "A kilobyte can mean 1,000 bytes or 1,024 bytes, depending on who is counting. That is why a drive sold as 500 GB can show up as about 465."
 ],
 "m2": [
  "Python converts for you. bin(11) gives the text '0b1011', and a number typed with 0b in front, such as 0b1011, is read as binary.",
  "Hexadecimal, base 16, is a shorthand for binary in which one digit stands for four bits. It uses 0 to 9 and then a to f, and is written with 0x in front."
 ],
 "m3": [
  "ASCII includes characters you cannot see. A new line is number 10 and a tab is number 9. In Python text they are written \\n and \\t.",
  "Text is compared by its numbers. Capitals have smaller numbers than small letters, so \"Zebra\" < \"apple\" is True."
 ],
 "m4": [
  "Characters and bytes are counted separately. The smiling emoji is one character but four bytes.",
  "If text is read back using the wrong table, you get garbled symbols instead of the original characters."
 ],
 "m5": [
  "Dividing by zero is not allowed. Python stops with ZeroDivisionError: division by zero.",
  "Two slashes always round down. So -7 // 2 is -4, not -3, because the exact answer is -3.5.",
  "Powers are worked out from right to left: 2 ** 3 ** 2 is 2 ** 9, which is 512.",
  "Mixing an int and a float always gives a float: 2 + 3.0 is 5.0.",
  "Floats are approximate. 0.1 + 0.2 gives 0.30000000000000004, so never rely on two floats being exactly equal."
 ],
 "m6": [
  "A name cannot start with a digit. 3total gives SyntaxError: invalid decimal literal, because Python starts reading a number and then meets letters.",
  "Names are case-sensitive: Total and total are different. A hyphen is not allowed, because it means minus.",
  "Python’s own words, such as if, for and True, cannot be used as names. print is not reserved, so print = 5 is allowed, and it breaks printing. Never reuse built-in names.",
  "x += 3 is shorthand for x = x + 3. You can assign several names at once with a, b = 1, 2, and swap them with a, b = b, a.",
  "One equals sign assigns. Two equals signs ask whether two values are equal, and give True or False."
 ],
 "m7": [
  "An int has no size limit in Python. 2 ** 100 gives all 31 digits exactly.",
  "A bool is a special kind of int. True counts as 1 and False as 0, so True + True is 2 and 1 == True is True.",
  "Two kinds of number can mix, so 12 + 3.0 is 15.0. A string times a whole number repeats it: \"12\" * 3 is '121212'.",
  "A name is not tied to one type. x = 5 followed by x = \"five\" is allowed."
 ]
};
DEEP.m8=["A format can follow the value inside the brackets. {total:.2f} shows a float with exactly two digits after the point, so 0.30000000000000004 appears as 0.30. Only the display changes. The stored value stays the same.", "print puts a space between its values and a new line at the end. sep=\"-\" changes what goes between them, and end=\"\" changes what goes at the end.", "A forgotten f is a logic error: the program runs without complaint and prints the wrong thing."];
DEEP.m9=["input with empty brackets shows no message and simply waits.", "Whatever the user types is kept exactly as typed, including any spaces at either end."];
DEEP.m10=["int ignores spaces around the number, so int(\"  25  \") is 25.", "To get a whole number from text like \"3.5\", convert in two steps: int(float(\"3.5\")) gives 3.", "Three tools turn a float into a whole number, and they differ. int cuts off the decimal part, so int(-3.9) is -3. Two slashes round down, so -3.9 // 1 is -4.0. round goes to the nearest whole number, so round(3.9) is 4.", "When a value is exactly halfway, round goes to the nearest even number: round(2.5) is 2 and round(3.5) is 4. This stops a long list of rounded values from drifting upward.", "Cutting off instead of rounding gives no error message. In a program that handles money, it quietly produces wrong totals."];
DEEP.m11=["A float keeps about 15 to 17 significant digits. Anything beyond that is lost.", "The error can come from multiplying as well as adding: 0.1 * 3 also gives 0.30000000000000004.", "Formatting with :.2f hides the error on screen, but the stored value is unchanged. Round the value itself when you need to compare it."];
DEEP.m12=["Python has no special sign for a comment that covers several lines. Put a hash at the start of each line.", "A value that never changes is usually named in capitals, such as PAISE_PER_RUPEE. Python does not enforce this. It is a signal to the reader.", "Never use a built-in name for a variable. Writing str = \"hello\" is allowed, and after it str() no longer converts anything.", "Python’s style conventions are written down in a guide called PEP 8. Following it makes your code look familiar to every other Python programmer."];

/* ---------- Project details, and the Level 1 checkpoint and project ---------- */
Object.assign(PROJECT,{"name": "Hello, me", "lede": "Write a script that prints a five-line introduction card about you, and run it two ways.", "brief": ["Create a folder for your course work, with a folder for this level inside it.", "In it, write hello_me.py. It prints at least five lines: your name, a goal, a favourite food, a fun fact, and a line of symbols such as =====.", "One of the lines prints the result of a sum, written without quotes.", "Run it in PyCharm, and run it from the terminal."], "ask": ["Which folder must the terminal be in?", "Which lines need quotes, and which must not have them?", "What changes if you swap two lines?"]});
export const CHECK1=[
{
"q": "How many different patterns can 5 bits make?",
"o": [
"10",
"25",
"32",
"64"
],
"c": 2,
"h": "Keep doubling from 2.",
"e": "Each extra bit doubles the count: 2, 4, 8, 16, 32."
},
{
"q": "What number is the binary pattern 1101?",
"o": [
"11",
"13",
"14",
"1101"
],
"c": 1,
"h": "Write 8, 4, 2 and 1 above the bits.",
"e": "The positions are worth 8, 4, 2 and 1. 8 + 4 + 1 = 13."
},
{
"q": "Which of these characters takes the most bytes in UTF-8?",
"o": [
"The letter A",
"The digit 5",
"The letter é",
"The emoji 😀"
],
"c": 3,
"h": "Bigger Unicode numbers need more bytes.",
"e": "A and 5 take 1 byte each, é takes 2, and the emoji takes 4."
},
{
"q": "What does 19 % 4 give?",
"o": [
"3",
"4",
"4.75",
"76"
],
"c": 0,
"h": "The percent sign gives what is left over.",
"e": "4 fits into 19 four times, using 16. The remainder is 3."
},
{
"q": "What does 2 + 3 ** 2 give?",
"o": [
"25",
"11",
"10",
"36"
],
"c": 1,
"h": "Powers come before adding.",
"e": "3 ** 2 is 9, and then 2 + 9 is 11."
},
{
"q": "A script has three lines: x = 4, then x = x * x, then x += 1. What is x at the end?",
"o": [
"9",
"16",
"17",
"5"
],
"c": 2,
"h": "Work out the right side of each line first.",
"e": "x starts at 4. Then x * x is 16. Then one more makes 17."
},
{
"q": "What type is the result of 10 / 2?",
"o": [
"int",
"float",
"str",
"bool"
],
"c": 1,
"h": "What does a single slash always give?",
"e": "Division with one slash always gives a float. The value is 5.0."
},
{
"q": "What does \"5\" * 3 give?",
"o": [
"15",
"A TypeError",
"'53'",
"'555'"
],
"c": 3,
"h": "The quotes make it text.",
"e": "A string times a whole number repeats the string: '555'."
},
{
"q": "A script runs n = input(\"Number? \") and then print(n + n). The user types 7. What is printed?",
"o": [
"77",
"14",
"A TypeError",
"7 7"
],
"c": 0,
"h": "What type does input give back?",
"e": "input gives back the text '7'. Joining two strings gives '77'."
},
{
"q": "What does int(\"4.0\") give?",
"o": [
"4",
"4.0",
"A ValueError",
"A TypeError"
],
"c": 2,
"h": "int only accepts text that looks like a whole number.",
"e": "The text 4.0 is not a whole number as written, so int raises a ValueError. Converting with float first would work."
}
];
export const PROJECT1={"name": "Tip calculator", "lede": "Write a program that works out the tip on a restaurant bill, and what each person pays.", "brief": ["Ask for the bill amount. It may include a decimal point.", "Ask for the tip as a percentage, such as 15.", "Ask how many people are sharing the bill.", "Print the tip amount, the total with tip, and each person’s share, each with exactly two digits after the point.", "Use clear snake case names, and at least two comments that say why."], "ask": ["Which conversion does each of the three answers need?", "How do you turn “15 percent of the bill” into arithmetic?", "Where does the two-digit format go?"], "checks": ["I worked out the three amounts by hand for a bill of 100, a tip of 15 and 3 people", "My program gives the same three amounts", "All three amounts show two digits after the point", "I predicted, then checked, what happens when the number of people is 0", "I predicted, then checked, what happens when the bill is typed as letters", "My names are in snake case and my comments say why"], "hints": ["Three questions mean three input lines. Decide for each one whether it needs int or float.", "Fifteen percent means 15 divided by 100, multiplied by the bill.", "Inside the curly brackets of an f-string, put the value, then a colon, then .2f"], "after": ["Multiply each person’s share, as displayed, by the number of people. For 100, 15 and 3 it comes to 114.99, one hundredth short of the total. Formatting changes only what is shown, so rounded shares do not always add up.", "Real payment apps fix this by giving the leftover amount to one person: two pay 38.33 and one pays 38.34.", "Choosing int for the tip means a user who types 12.5 crashes the program. Choosing float accepts it. Neither is wrong, but it should be a decision you made on purpose.", "The wording of an error can differ between Python versions. Dividing a float by zero says “float division by zero” in older versions and “division by zero” in newer ones. The kind of error, ZeroDivisionError, is the same."]};
/* ---------- More common mistakes, by lesson id. Shown under "Watch out for". ---------- */
export const MORE={
 "n1": [
  [
   "Naming the device as the processing.",
   "The phone or computer is the thing doing the work. The processing is the work itself, such as adding two numbers. A quick test: processing is always a verb."
  ]
 ],
 "n2": [
  [
   "Thinking the CPU stores your data.",
   "The CPU does not hold your data. It reaches into RAM, works on a small piece, and puts the result back."
  ],
  [
   "Mixing up the CPU’s steps.",
   "The CPU fetches an instruction, decodes what it means, then executes it. The actual work, such as adding, happens in the execute step, not while decoding."
  ],
  [
   "Thinking an SSD keeps data for ever.",
   "It holds its data for many years without power, but not literally for ever."
  ]
 ],
 "n3": [
  [
   "Leaving out where, or how much.",
   "“Pour some milk” does not say into what, or how much. A computer cannot fill in the gap."
  ],
  [
   "Forgetting to say when to stop.",
   "“Stir it” never ends. “Stir it for a minute” does."
  ],
  [
   "Assuming a clear step is a sensible one.",
   "“Pour milk until the pan is full” is perfectly clear, and it would boil over. The computer does what you say, not what you meant."
  ]
 ],
 "n4": [
  [
   "Stopping the path at the folder.",
   "../code points at a folder. A path to a file has to end with the file itself: ../code/hello.py."
  ]
 ],
 "n5": [
  [
   "Expecting every prompt to look the same.",
   "A Mac may use the zsh shell, with a prompt ending in %, or the older bash shell, with a prompt ending in $. Every command in this level works the same in both."
  ],
  [
   "Not being sure where you are.",
   "A prompt can be hard to read at first. Running pwd always tells you which folder you are in."
  ]
 ],
 "n6": [
  [
   "Mistyping a folder name without noticing.",
   "mkdir level10 works just as well as mkdir level0, so the terminal will not warn you. Check the result of ls one character at a time."
  ],
  [
   "Trying to remove a folder that is not empty.",
   "rmdir only removes an empty folder, and says “Directory not empty” otherwise. That is a safety feature. Empty the folder first."
  ],
  [
   "Not reading which word the error is about.",
   "A wrong command name gives “command not found”. A wrong folder name gives “No such file or directory”."
  ],
  [
   "Typing every name in full.",
   "Press Tab after the first few letters and the shell finishes the name for you, which avoids typos."
  ]
 ],
 "n7": [
  [
   "Installing Python when it is already there.",
   "Run python3 --version first. If it prints a version number, Python is installed."
  ],
  [
   "Worrying about the extra files in a new project.",
   "PyCharm creates files such as .venv and pyproject.toml to manage the project. You can ignore them for now."
  ]
 ],
 "n8": [
  [
   "Thinking the Run button does something special.",
   "It runs a command for you. The first line of the output shows that command, made of absolute paths you can read."
  ],
  [
   "Expecting ls to show everything.",
   "Files whose names start with a dot, such as .venv, are hidden. ls -a shows them."
  ]
 ],
 "n9": [
  [
   "Typing a shell command at the Python prompt.",
   "python3 hello.py typed at >>> gives a SyntaxError whichever folder you are in, because Python is listening, not the shell. Check the prompt first."
  ],
  [
   "Typing text without quotes at the Python prompt.",
   "Python tries to read the words as code, and reports a SyntaxError."
  ]
 ],
 "m1": [
  [
   "Listing patterns in a jumbled order.",
   "Write them in counting order: 000, 001, 010 and so on. It is then easy to see that none is missing or repeated."
  ]
 ],
 "m3": [
  [
   "Wondering why printed text does not appear as numbers.",
   "The table is used in both directions. Characters become numbers when they are stored, and the numbers are turned back into characters when they are shown. ord lets you see the numbers underneath."
  ]
 ],
 "m5": [
  [
   "Being unsure how a number with a decimal point fits into bits.",
   "The positions carry on past the point: a half, a quarter, an eighth. So 3.5 is 2 + 1 + a half, which is 11.1 in binary. Python calls numbers like this floats."
  ]
 ],
 "m6": [
  [
   "Running two words together in a name.",
   "totalamount works, but it is hard to read, and an editor may flag it as a spelling mistake. Write total_amount."
  ]
 ],
 "m7": [
  [
   "Expecting a string plus a number to be joined.",
   "Some languages turn \"12\" + 3 into '123'. Python raises a TypeError, because it will not guess."
  ],
  [
   "Converting something that is already the right type.",
   "In \"12\" + str(\"3\") the 3 is already text, so str does nothing. Convert the number instead: \"12\" + str(3)."
  ]
 ],
 "m8": [
  [
   "Expecting the commas in print to be printed.",
   "The commas separate the values in your code. They are not part of the output. sep decides what is printed between the values."
  ]
 ],
 "m10": [
  [
   "Converting a value and then not calculating with it.",
   "Converting an answer to int only matters if you do arithmetic with it, as in age + 1."
  ],
  [
   "Expecting two slashes to cut off the decimal part.",
   "-3.9 // 1 is -4.0, not -3.0, because two slashes always round down."
  ]
 ]
};

/* ---------- Courses: how lessons are grouped, and what is planned ---------- */
export const NODESC=[
{
"id": "c1",
"no": "",
"t": "What a computer is",
"m": 25,
"w": "jobs",
"why": "Phones, laptops, cash machines and washing machines all contain computers. Knowing what makes something a computer is the starting point for everything else on this site.",
"L": [
"A <b>computer</b> is a machine that takes in information, follows a stored list of instructions to work on it, and gives back a result.",
"The list of instructions is called a <b>program</b>. What makes a computer special is that the program can be changed. The same machine can be a calculator one minute and a music player the next. A machine like this is called <b>general-purpose</b>.",
"The physical parts you can touch, such as the screen, the keyboard and the chips inside, are the <b>hardware</b>. The programs that tell the hardware what to do are the <b>software</b>.",
"A <b>platform</b> is the base that other software runs on. Usually it is a kind of hardware together with its main software, such as an Android phone or a Windows laptop. An app built for one platform often will not run on another.",
"Computers come in many shapes. A laptop and a phone are computers. So are the small ones built into cars, lifts and microwave ovens, which run a single program for one job.",
"A computer does exactly what its instructions say, and nothing else. It does not understand what it is doing, and it cannot guess what you meant."
],
"an": "A music box plays one tune for ever. A music player can play any tune you give it. A computer is the second kind of machine, and the tune is the program.",
"ex": {
"t": "One phone, three jobs",
"walk": [
"Open the calculator. The phone follows the calculator program: your taps go in, and a sum comes out.",
"Open the music app. Same phone, different program: your choice goes in, and sound comes out.",
"Open the camera. Same phone again: light goes in, and a photo comes out.",
"Nothing about the hardware changed. Only the program did."
]
},
"P": [
{
"q": "A basic toaster and a phone both use electricity. Which one is a general-purpose computer?",
"o": [
"The toaster",
"The phone",
"Both"
],
"c": 1,
"y": "The phone can run any program you give it. The toaster does one fixed job.",
"x": "Both, because both are electrical. Using electricity is not what makes something a computer."
},
{
"q": "You install a new game on a laptop. What have you changed?",
"o": [
"The hardware",
"The software",
"Both"
],
"c": 1,
"y": "A game is a program, which is software. The physical parts of the laptop are the same as before."
}
],
"Q": [
{
"q": "What is a program?",
"o": [
"A part inside the computer",
"A stored list of instructions for the computer to follow",
"The screen",
"A kind of cable"
],
"c": 1,
"h": "It is what you change to give the machine a new job.",
"e": "A program is a list of instructions. Changing it changes what the computer does."
},
{
"q": "Which of these is hardware?",
"o": [
"A web browser",
"A keyboard",
"A game",
"A photo-editing app"
],
"c": 1,
"h": "Hardware is what you can touch.",
"e": "A keyboard is a physical part. The other three are programs, which are software."
},
{
"q": "What does “general-purpose” mean?",
"o": [
"It is very fast",
"It can do many different jobs by running different programs",
"It is cheap",
"It has many buttons"
],
"c": 1,
"h": "Think of the calculator, the music app and the camera.",
"e": "A general-purpose machine can be given a new job simply by giving it a new program."
},
{
"q": "Spot the mistake: “A computer understands what you want and works out the best way to do it.”",
"o": [
"The statement is correct",
"Wrong: it only follows its instructions exactly",
"Wrong: only phones do that",
"Wrong: computers cannot follow instructions"
],
"c": 1,
"h": "Does it guess, or does it follow?",
"e": "A computer follows its instructions exactly and never guesses what you meant."
}
],
"T": [
{
"p": "List five things in your home that contain a computer. Include at least one that is not a phone, tablet or laptop.",
"h": [
"Which devices have a screen, buttons or a timer?",
"Think about the kitchen, the living room and a car.",
"A television, a washing machine, a microwave oven, a router and a car are all good answers."
]
},
{
"p": "Pick one device you use every day. Name two pieces of its hardware and two pieces of its software.",
"h": [
"What can you touch on it?",
"What do you open or run on it?",
"For a phone, the screen and the battery are hardware. The camera app and the messaging app are software."
]
}
],
"M": [
[
"Thinking a computer has to look like a laptop.",
"Anything that follows a stored program counts, including the small computers inside cars and appliances."
],
[
"Thinking the computer is clever.",
"It is fast and exact, not clever. Any cleverness comes from the people who wrote its programs."
]
],
"G": [
[
"general-purpose",
"Able to do many different jobs by running different programs."
],
[
"hardware",
"The physical parts of a computer."
],
[
"software",
"The programs that tell the hardware what to do."
],
[
"platform",
"The base that other software runs on: usually a kind of hardware together with its main software."
]
]
},
{
"id": "c2",
"no": "",
"t": "Why we need computers",
"m": 20,
"w": "speed",
"why": "Computers were built because some jobs are too long, too repetitive or too error-prone for people. Knowing what they are good at, and what they are bad at, tells you which problems are worth giving them.",
"L": [
"A computer is <b>fast</b>. A modern processor carries out billions of simple steps every second.",
"A computer is <b>exact</b>. It does the millionth sum as carefully as the first. People get tired and make slips.",
"A computer is <b>tireless</b>. It will repeat the same job all day and all night.",
"A computer <b>remembers</b>. It can store huge amounts of information and find any piece of it again almost instantly.",
"But a computer has no judgement. If its instructions or its information are wrong, it produces wrong results just as quickly and confidently. Programmers call this <b>garbage in, garbage out</b>."
],
"an": "A tireless assistant who never makes an arithmetic slip, never forgets, and works at lightning speed, but who will follow a wrong instruction without a second thought.",
"ex": {
"t": "Adding up a year of shop receipts",
"walk": [
"A shop has one million receipts to add up.",
"A person adding one every two seconds, without a break, would need about 23 days.",
"A computer can do it in a fraction of a second.",
"If even one receipt was typed in wrongly, the computer’s total is wrong too, and it will not notice."
]
},
"P": [
{
"q": "Which of these jobs suits a computer best?",
"o": [
"Deciding whether a painting is beautiful",
"Adding up ten million numbers",
"Comforting a friend"
],
"c": 1,
"y": "It is long, repetitive and exact, which is what computers are good at. The other two need human judgement."
},
{
"q": "A program is given the wrong price for every item in a shop. What will its totals be?",
"o": [
"Correct, because computers do not make mistakes",
"Wrong, and the computer will not notice",
"It will refuse to run"
],
"c": 1,
"y": "The arithmetic is done perfectly, but on the wrong numbers. Garbage in, garbage out.",
"x": "Correct. A computer is exact, but it cannot know that its information is wrong."
}
],
"Q": [
{
"q": "Roughly how many simple steps can a modern processor carry out in one second?",
"o": [
"Hundreds",
"Thousands",
"Millions",
"Billions"
],
"c": 3,
"h": "It is a very large number.",
"e": "A modern processor carries out billions of simple steps each second."
},
{
"q": "What does “garbage in, garbage out” mean?",
"o": [
"Old computers should be thrown away",
"Wrong information or instructions give wrong results",
"Computers make random mistakes",
"Programs fill up the memory"
],
"c": 1,
"h": "The computer cannot judge what it is given.",
"e": "If what goes in is wrong, what comes out is wrong, however exact the computer is."
},
{
"q": "Which of these is a computer bad at?",
"o": [
"Repeating a task a million times",
"Remembering large amounts of information",
"Judging whether its instructions make sense",
"Doing arithmetic"
],
"c": 2,
"h": "It follows. It does not question.",
"e": "A computer has no judgement. It follows its instructions whether or not they make sense."
},
{
"q": "Spot the mistake: “Computers are useful because they are cleverer than people.”",
"o": [
"The statement is correct",
"Wrong: they are useful because they are fast, exact and tireless",
"Wrong: they are slower than people",
"Wrong: computers are not useful"
],
"c": 1,
"h": "Think of what they are actually good at.",
"e": "Their strength is speed, accuracy and endurance, not cleverness."
}
],
"T": [
{
"p": "Think of a job you do by hand that is long and repetitive. Describe how a computer could help with it.",
"h": [
"What do you do again and again?",
"Which part of it is the same every time?",
"For example: adding up monthly expenses, sorting a list of names, or renaming a hundred photos."
]
},
{
"p": "Find one real example of a computer giving a wrong result because it was given wrong information.",
"h": [
"When has an app or a machine shown you something obviously wrong?",
"Think about maps, bills or spelling correction.",
"A map app sending you down a closed road, or a bill with a wrongly typed amount, are both examples."
]
}
],
"M": [
[
"Trusting a result because a computer produced it.",
"The arithmetic is reliable. The information and the instructions may not be."
],
[
"Thinking computers can replace judgement.",
"They carry out decisions that people have written down. They do not make their own."
]
],
"G": [
[
"garbage in, garbage out",
"If the information or instructions given to a computer are wrong, its results will be wrong too."
]
]
},
{
"id": "c3",
"no": "",
"t": "A short history of computers",
"m": 30,
"w": "timeline",
"why": "Every computer today, from a phone to a data centre, works on ideas that were developed over about two hundred years. Seeing the steps makes the modern machine much less mysterious.",
"L": [
"The word “computer” first meant a person. For centuries, a computer was someone whose job was to do calculations by hand.",
"In the 1830s, <b>Charles Babbage</b> designed a mechanical computer driven by gears, called the Analytical Engine. It was never finished. In 1843, <b>Ada Lovelace</b> published a set of instructions for it, which is often called the first computer program.",
"In 1936, <b>Alan Turing</b> described, on paper, a single machine that could carry out any calculation if it was given the right instructions. This is the idea of the general-purpose computer.",
"In the 1940s the first electronic computers were built. One of them, ENIAC, filled a large room. These machines used glass <b>vacuum tubes</b> as switches. Soon afterwards, computers began keeping their instructions in memory alongside their data, which is how every computer works today.",
"In 1947 the <b>transistor</b> was invented: a tiny, reliable switch that replaced the vacuum tube. By about 1960, many transistors could be made together on one small <b>chip</b>. In 1971 a whole processor was put on a single chip, called a <b>microprocessor</b>.",
"From there, computers kept getting smaller, cheaper and faster. Personal computers arrived in the 1970s and 1980s, the World Wide Web around 1990, and smartphones in the 2000s."
],
"an": "A relay race. No single runner invented the computer. Each one carried the idea a little further and handed it on.",
"ex": {
"t": "From a room to a pocket",
"walk": [
"1940s: a computer fills a room and is used by a team of specialists.",
"1960s: a computer is the size of a few cupboards and belongs to a company or a university.",
"1980s: a computer sits on a desk at home.",
"2000s onwards: a computer fits in a pocket, and is far more powerful than the room-sized machines."
]
},
"P": [
{
"q": "Before the 1940s, what was a “computer”?",
"o": [
"A kind of typewriter",
"A person who did calculations",
"A telephone exchange"
],
"c": 1,
"y": "The word described a job. A computer was a person who calculated by hand."
},
{
"q": "The transistor replaced the vacuum tube. What was the main effect?",
"o": [
"Computers became larger",
"Computers became smaller, cheaper and more reliable",
"Computers stopped using electricity"
],
"c": 1,
"y": "A transistor does the same switching job in a tiny, reliable part, so far more of them fit in far less space."
}
],
"Q": [
{
"q": "Who designed a mechanical computer in the 1830s?",
"o": [
"Alan Turing",
"Charles Babbage",
"Ada Lovelace",
"Nobody: computers began in the 1940s"
],
"c": 1,
"h": "His machine was driven by gears and was never finished.",
"e": "Charles Babbage designed the Analytical Engine in the 1830s."
},
{
"q": "What is Ada Lovelace known for?",
"o": [
"Building the first electronic computer",
"Publishing what is often called the first computer program",
"Inventing the transistor",
"Designing the first smartphone"
],
"c": 1,
"h": "It was a set of instructions, in 1843.",
"e": "In 1843 she published instructions for Babbage’s machine, often called the first program."
},
{
"q": "What did the first electronic computers of the 1940s use as switches?",
"o": [
"Transistors",
"Microprocessors",
"Vacuum tubes",
"Gears"
],
"c": 2,
"h": "They were made of glass.",
"e": "They used vacuum tubes. The transistor was invented later, in 1947."
},
{
"q": "Spot the mistake: “The computer was invented by one person in a single year.”",
"o": [
"The statement is correct",
"Wrong: it was developed in stages by many people over about two hundred years",
"Wrong: it was invented by two people",
"Wrong: nobody knows anything about its history"
],
"c": 1,
"h": "Think of the relay race.",
"e": "The computer came from many people’s work, from the 1830s to the present day."
}
],
"T": [
{
"order": ["The Analytical Engine", "The transistor", "The microprocessor", "The smartphone"],
"order": ["The Analytical Engine", "The transistor", "The microprocessor", "The smartphone"],
"p": "Put these in order from earliest to latest. Drag them, or use the arrow buttons.",
"h": [
"Which one is mechanical?",
"Which one needs the others to exist?",
"The Analytical Engine, then the transistor, then the microprocessor, then the smartphone."
]
},
{
"p": "Explain to someone, in your own words, why computers got smaller over time.",
"h": [
"Which part does the switching?",
"What happened to the size of that part?",
"Vacuum tubes were replaced by transistors, and then huge numbers of transistors were put on a single chip."
]
}
],
"M": [
[
"Thinking computers are a recent invention.",
"The ideas go back to the 1830s. Only the electronic versions are recent."
],
[
"Looking for a single inventor.",
"There is none. The computer was built up step by step by many people."
]
],
"G": [
[
"vacuum tube",
"A glass part used as a switch in the first electronic computers."
],
[
"transistor",
"A tiny, reliable electronic switch, invented in 1947."
],
[
"chip",
"A small piece of material carrying many transistors."
],
[
"microprocessor",
"A complete processor on a single chip."
]
]
}
];
export const ERAS=[["1830s", "A design made of gears", "Charles Babbage designs the Analytical Engine, a mechanical computer. It is never finished."], ["1843", "The first program", "Ada Lovelace publishes a set of instructions for Babbage’s machine. It is often called the first computer program."], ["1936", "One machine for every job", "Alan Turing describes a single machine that can carry out any calculation, given the right instructions."], ["1940s", "Electronic, and room-sized", "The first electronic computers are built from thousands of glass vacuum tubes. They fill whole rooms."], ["1947 to 1971", "Smaller and smaller switches", "The transistor replaces the vacuum tube. Then many transistors are put on one chip, and finally a whole processor."], ["1970s onwards", "A computer for everyone", "Personal computers reach desks at home, the web connects them, and smartphones put one in every pocket."]];
CHECK.push({"q": "What makes a computer different from a machine such as a toaster?", "o": ["It uses electricity", "It can do different jobs by following different stored instructions", "It is faster", "It has a screen"], "c": 1, "h": "Think of one phone doing three jobs.", "e": "A computer is general-purpose. Change the program and the same machine does a different job."},{"q": "Who published what is often called the first computer program, in 1843?", "o": ["Charles Babbage", "Ada Lovelace", "Alan Turing", "Nobody: programs began in the 1940s"], "c": 1, "h": "She wrote instructions for the Analytical Engine.", "e": "Ada Lovelace published instructions for Babbage’s machine in 1843."});
export const PROJECTC={"name": "Know your machine", "lede": "Explore your own computer using what this course taught you, and write down what you find.", "brief": ["Find out how much RAM and how much storage your computer has, and write both down.", "Using only the terminal, create a folder called fundamentals with two folders inside it: notes and code.", "Write the absolute path of the notes folder, and the relative path from notes to code.", "Write your first name as numbers, using the ASCII table. Then write the first of those numbers in binary.", "Write the steps for an everyday task, such as making tea, so clearly that a machine could follow them. Include a step that says when to stop."], "ask": ["Which command tells you where you are, and which shows what is in a folder?", "Which symbol means “go up one level”?", "Is a capital letter the same character as a small one?"], "checks": ["I wrote down my computer’s RAM and storage", "I made the three folders using only the terminal, and checked with ls", "My absolute path starts at the root, and my relative path uses two dots", "I wrote my name as ASCII numbers, and one of them in binary", "My everyday steps are clear, in order, and say when to stop"], "hints": ["Start in your home folder. Make the outer folder first, go into it, then make the two inner ones.", "From notes, the code folder is up one level and then down.", "A capital A is 65, and the letters count up from there. For binary, start from the largest position value that fits."], "after": ["You can make both inner folders with one command by giving mkdir two names.", "Try the same project on a different computer or operating system. The ideas are the same, and only the details change."]};
export const COURSES=[
 {
  "id": "cf",
  "name": "Computer fundamentals",
  "blurb": "What a computer is, how it works inside, how to find your way around one by typing, and how it stores numbers and text. No programming yet.",
  "sections": [
   {
    "t": "What a computer is",
    "ids": [
     "c1",
     "c2",
     "c3"
    ]
   },
   {
    "t": "Inside the machine",
    "ids": [
     "n1",
     "n2",
     "n3"
    ]
   },
   {
    "t": "Files and the terminal",
    "ids": [
     "n4",
     "n5",
     "n6"
    ]
   },
   {
    "t": "How data is stored",
    "ids": [
     "m1",
     "m2",
     "m3",
     "m4"
    ]
   },
   {
    "t": "Finishing the course",
    "ids": [
     "cp:cf",
     "pj:machine"
    ]
   }
  ]
 },
 {
  "id": "py",
  "name": "Python",
  "blurb": "Your first programming language. Set up your tools, write and run real programs, and learn how Python handles numbers, text and input.",
  "sections": [
   {
    "t": "Getting set up",
    "ids": [
     "n7",
     "n8",
     "n9",
     "pj:hello"
    ]
   },
   {
    "t": "Numbers, names and types",
    "ids": [
     "m5",
     "m6",
     "m7"
    ]
   },
   {
    "t": "Text and input",
    "ids": [
     "m8",
     "m9",
     "m10"
    ]
   },
   {
    "t": "Details that matter",
    "ids": [
     "m11",
     "m12"
    ]
   },
   {
    "t": "Finishing this part",
    "ids": [
     "cp:py",
     "pj:tip"
    ]
   }
  ]
 }
];
COURSES[1].later=LATER.slice(1);
export const CHECKS={"cf": [["cp", "c0"], ["cp", "c1"], ["cp", "c2"], ["cp", "c3"], ["cp", "c8"], ["cp", "c10"], ["cp", "c11"], ["cp1", "d0"], ["cp1", "d1"], ["cp1", "d2"]], "py": [["cp", "c4"], ["cp", "c5"], ["cp", "c6"], ["cp", "c7"], ["cp", "c9"], ["cp1", "d3"], ["cp1", "d4"], ["cp1", "d5"], ["cp1", "d6"], ["cp1", "d7"], ["cp1", "d8"], ["cp1", "d9"]]};
export const PROJECTS={hello:{store:"proj",course:"py",data:PROJECT},tip:{store:"proj1",course:"py",data:PROJECT1},machine:{store:"projc",course:"cf",data:PROJECTC}};
export const PLANNED=[
 [
  "Foundations",
  [
   "Computer science",
   "Linux",
   "Shell and Bash",
   "Git and GitHub",
   "Data structures and algorithms"
  ]
 ],
 [
  "Languages",
  [
   "JavaScript",
   "Java",
   "Kotlin",
   "R",
   "SQL",
   "HTML",
   "CSS"
  ]
 ],
 [
  "Web development",
  [
   "Frontend",
   "Backend",
   "Full stack",
   "Vue",
   "Node.js",
   "API design",
   "Design systems",
   "Frontend performance",
   "Backend performance",
   "API security"
  ]
 ],
 [
  "Data and AI",
  [
   "Data analyst",
   "Python for data analysis",
   "Data engineer",
   "Machine learning",
   "AI and data scientist",
   "AI engineer",
   "AI agents",
   "Prompt engineering",
   "MLOps",
   "Inference engineering",
   "AI red teaming",
   "AI product builder",
   "Claude Code",
   "Vibe coding"
  ]
 ],
 [
  "Infrastructure and security",
  [
   "DevOps",
   "DevSecOps",
   "Cloud computing",
   "Docker",
   "Kubernetes",
   "Terraform",
   "Network engineer",
   "Cyber security",
   "MongoDB",
   "Redis",
   "Elasticsearch"
  ]
 ],
 [
  "Design and architecture",
  [
   "Software architect",
   "Software design and architecture",
   "System design",
   "UX design",
   "Code review",
   "Coding interview practice"
  ]
 ],
 [
  "Mobile",
  [
   "iOS",
   "SwiftUI"
  ]
 ],
 [
  "Product and people",
  [
   "Product manager",
   "Engineering manager",
   "Developer relations",
   "Technical writer",
   "QA",
   "Forward deployed engineer"
  ]
 ]
];
MORE.c3=[["Treating a “first” as a settled fact.","Historians argue about which machine or program was truly the first. What matters is the order of the ideas: a design, a program, a theory, then electronic machines that kept shrinking."]];
DEEP.c1=["A platform does not always include hardware. A web browser is a platform too: websites run on it, whether the browser is on Windows, a Mac or a phone.", "Cross-platform software is built to run on more than one platform. Python is an example: the same program runs on Windows, Mac and Linux."];

/* ---------- "Your turn" task details: how each task is answered on the page ---------- */
export const TASKX={
"c1t0": {
"kind": "text",
"sample": "A television, a washing machine, a microwave oven, a Wi-Fi router and a car. Each one follows a stored program to do its job.",
"rubric": {
"min_words": 5,
"count": {
"groups": [
[
"TV",
"\\b(tv|television)\\b|தொலைக்காட்சி|டிவி"
],
[
"fridge",
"\\b(fridge|refrigerator)\\b|குளிர்சாதன|ஃப்ரிட்ஜ்|பிரிட்ஜ்"
],
[
"washing machine",
"washing machine|\\bwasher\\b|சலவை|வாஷிங்"
],
[
"microwave oven",
"microwave|நுண்ணலை|மைக்ரோவேவ்"
],
[
"router",
"\\b(router|modem|wi-?fi)\\b|ரவுட்டர்|ரூட்டர்|மோடம்"
],
[
"car",
"\\b(car|bike|scooter)\\b|கார்|பைக்"
],
[
"watch or clock",
"\\b(smart ?watch|watch|clock)\\b|கடிகார|வாட்ச்"
],
[
"printer",
"\\bprinter\\b|அச்சுப்பொறி|பிரிண்டர்"
],
[
"camera",
"\\bcamera\\b|கேமரா"
],
[
"game console",
"\\b(console|playstation|xbox|ps4|ps5|nintendo)\\b"
],
[
"speaker",
"\\b(speaker|alexa|echo|google home)\\b|ஒலிபெருக்கி|ஸ்பீக்கர்"
],
[
"air conditioner",
"\\b(ac|air ?conditioner)\\b|குளிரூட்டி|ஏசி"
],
[
"remote control",
"\\bremote\\b|ரிமோட்"
],
[
"calculator",
"\\bcalculator\\b|கணிப்பான்"
],
[
"set-top box",
"set.?top|\\bdth\\b"
],
[
"induction stove",
"\\binduction\\b|இண்டக்ஷன்"
],
[
"water purifier",
"purifier|சுத்திகரிப்"
],
[
"doorbell or CCTV",
"doorbell|\\bcctv\\b"
],
[
"inverter",
"\\b(inverter|ups)\\b|இன்வெர்ட்டர்"
],
[
"lift",
"\\b(lift|elevator)\\b|மின்தூக்கி"
],
[
"phone",
"\\b(phone|mobile|smartphone|cellphone)\\b|தொலைபேசி|கைப்பேசி|மொபைல்|போன்"
],
[
"tablet",
"\\b(tablet|ipad)\\b|டேப்லெட்"
],
[
"laptop or computer",
"\\b(laptop|computer|pc|desktop|macbook)\\b|மடிக்கணினி|கணினி"
]
],
"need": 5,
"common": [
"phone",
"tablet",
"laptop or computer"
]
}
}
},
"c1t1": {
"kind": "sort",
"p": "Sort these parts of a phone into hardware and software.",
"cats": [
"Hardware",
"Software"
],
"items": [
[
"The screen",
0
],
[
"The camera app",
1
],
[
"The battery",
0
],
[
"The messaging app",
1
],
[
"The speaker",
0
],
[
"The web browser",
1
]
],
"h": [
"Can you touch it?",
"Hardware is a physical part. Software is a program that runs on it.",
"The screen, the battery and the speaker are hardware. The two apps and the browser are software."
]
},
"c2t0": {
"kind": "text",
"sample": "Adding up a month of expenses. A spreadsheet totals every row instantly, never mistypes a sum, and redoes the total the moment a number changes.",
"rubric": {
"min_words": 10,
"ideas": [
{
"label": "Name a job that is long or repetitive",
"re": "\\b(every|each|again|repeat|repetitive|daily|weekly|monthly|hundreds?|thousands?|many|long|lots|list|all the)\\b|ஒவ்வொரு|மீண்டும்|திரும்பத்|தினமும்|நூற்றுக்|ஆயிரக்|பல",
"req": true
},
{
"label": "Say how a computer would help",
"re": "\\b(fast|faster|quick|quickly|instant|instantly|automatic|automatically|spreadsheet|excel|program|app|software|calculate|sort|count|remind|never (gets )?tired|accurate|no mistakes?|seconds?)\\b|வேகம்|உடனடி|தானாக|விரிதாள்|நிரல்|செயலி|துல்லிய",
"req": true
}
]
}
},
"c2t1": {
"kind": "text",
"sample": "A map app sends a driver down a road that has closed, because its map data is out of date. The app followed its instructions perfectly; the information it was given was wrong.",
"rubric": {
"min_words": 10,
"ideas": [
{
"label": "Name the app or machine",
"re": "\\b(map|maps|gps|app|bill|calculator|website|bank|phone|autocorrect|spell|weather|atm|machine|computer|system|software)\\b|வரைபட|செயலி|கட்டண|இணையதள|வங்கி|இயந்திர|கணினி",
"req": true
},
{
"label": "Say what went wrong",
"re": "\\b(wrong|incorrect|mistake|error|false|bad|showed|sent|charged|failed)\\b|தவறு|தவறான|பிழை",
"req": true
},
{
"label": "Explain that the information it was given was wrong",
"re": "\\b(because|typed|entered|input|old|outdated|out of date|wrong (data|information|number|price|address)|data|information)\\b|ஏனெனில்|தட்டச்சு|பழைய|தகவல்|தரவு",
"req": true
}
]
}
},
"c3t1": {
"kind": "text",
"sample": "The part that does the switching kept shrinking. Glass vacuum tubes were replaced by tiny transistors, and then huge numbers of transistors were put on a single chip.",
"rubric": {
"min_words": 8,
"ideas": [
{
"label": "Mention transistors",
"re": "transistor|டிரான்சிஸ்டர்",
"req": true
},
{
"label": "Mention what they replaced: vacuum tubes",
"re": "vacuum|valve|tube|வெற்றிட|குழாய்",
"req": false
},
{
"label": "Mention chips: many transistors on one chip",
"re": "\\b(chips?|integrated circuit|microprocessor|silicon)\\b|சில்லு|சில்லில்|நுண்செயலி",
"req": true
}
]
}
},
"n1t0": {
"kind": "sort",
"p": "Someone sends a photo in a chat app. Sort each step into input, processing or output.",
"cats": [
"Input",
"Processing",
"Output"
],
"items": [
[
"Tapping the photo to choose it",
0
],
[
"Making the photo smaller so it sends faster",
1
],
[
"The photo appearing in the chat",
2
],
[
"Typing a caption",
0
],
[
"Checking the caption for blocked words",
1
],
[
"A tick showing the message was sent",
2
]
],
"h": [
"Ask of each step: is something going in, being worked on, or coming out?",
"Anything the person does with their fingers is input.",
"Choosing the photo and typing are input. Shrinking and checking are processing. The photo in the chat and the tick are output."
]
},
"n1t1": {
"kind": "choice",
"multi": true,
"p": "Which of these are both input and output devices?",
"opts": [
"A touchscreen",
"A keyboard",
"A headset with a microphone",
"A printer",
"A webcam"
],
"ans": [
0,
2
],
"h": [
"A device that is both takes something in and gives something out.",
"A headset has a speaker and a microphone.",
"The touchscreen and the headset with a microphone."
]
},
"n2t0": {
"kind": "choice",
"p": "A laptop’s About screen says: “Chip: 8-core. Memory: 16 GB. Storage: 512 GB.” How much RAM does it have?",
"opts": [
"8",
"16 GB",
"512 GB",
"It does not say"
],
"ans": [
1
],
"h": [
"RAM is often listed under another name.",
"On most About screens, Memory means RAM.",
"16 GB."
]
},
"n2t1": {
"kind": "text",
"p": "In your own words, explain why the Save button exists.",
"sample": "While you work, your file is only in RAM, which is wiped when the power goes off. Save copies it to storage, which keeps it without power.",
"rubric": {
"min_words": 10,
"ideas": [
{
"label": "Your work is in RAM while you use it",
"re": "\\b(ram|memory)\\b",
"req": true
},
{
"label": "RAM is wiped when the power goes off",
"re": "\\b(wiped|lost|lose|erased|cleared|disappears?|gone|temporary|power|switch(ed)? off|turn(ed)? off|shut ?down|restart|crash)",
"req": true
},
{
"label": "Saving copies it to storage, which keeps it",
"re": "\\b(storage|disk|drive|ssd|hdd|permanent|keeps?|kept|stays?|safe)\\b",
"req": true
}
]
}
},
"n3t0": {
"kind": "text",
"min": 40,
"sample": "1. Pick up the toothbrush. 2. Turn on the tap and wet the brush. 3. Squeeze a pea-sized amount of toothpaste onto the bristles. 4. Brush every tooth for two minutes. 5. Spit into the sink. 6. Rinse the brush under the tap. 7. Turn off the tap. 8. Put the toothbrush back, then stop.",
"rubric": {
"min_words": 12,
"steps": {
"min": 3,
"max": 8
},
"ideas": [
{
"label": "Pick up or use the toothbrush",
"re": "\\b(tooth ?brush|brush)\\b",
"req": true
},
{
"label": "Put toothpaste on the brush",
"re": "\\b(tooth ?paste|paste)\\b",
"req": true
},
{
"label": "Use water: wet or rinse",
"re": "\\b(water|tap|rinse|wet)\\b",
"req": false
},
{
"label": "Say when to stop",
"re": "\\b(stop|finish|finished|done|end|until|minutes?|seconds?)\\b",
"req": true
}
]
}
},
"n3t1": {
"kind": "order",
"p": "Put these steps in order so they find the smallest card.",
"order": [
"Remember the first card as the smallest so far.",
"Look at the next card.",
"If it is smaller, remember it instead.",
"Repeat until no cards are left.",
"Say the card you remembered."
],
"h": [
"Which step has to happen before you can compare anything?",
"You need a card to compare against before you look at the others.",
"Remember the first card, look at the next, keep the smaller, repeat, then say the answer."
]
},
"n4t0": {
"kind": "fill",
"p": "Your home folder is /Users/ana. You create a folder called python_course inside it. Type the absolute path of python_course.",
"fields": [
{
"l": "Absolute path",
"ph": "/"
}
],
"accept": [
"/Users/ana/python_course"
],
"h": [
"An absolute path starts at the root.",
"Start with the path of the home folder.",
"/Users/ana/python_course"
]
},
"n4t1": {
"kind": "fill",
"p": "You are in /Users/ana/python_course. Type the relative path to a file called notes.txt in /Users/ana/Desktop.",
"fields": [
{
"l": "Relative path",
"ph": ".."
}
],
"accept": [
"../Desktop/notes.txt"
],
"h": [
"First you need to go up one level.",
"Two dots mean the folder above.",
"../Desktop/notes.txt"
]
},
"n5t0": {
"kind": "sort",
"p": "A prompt reads:  ana@mac ~ %   Label each part.",
"cats": [
"User name",
"Computer name",
"Current folder",
"End of the prompt"
],
"items": [
[
"ana",
0
],
[
"mac",
1
],
[
"~",
2
],
[
"%",
3
]
],
"h": [
"The prompt tells you who, on which computer, and where.",
"~ is a short way to write your home folder.",
"ana is the user, mac is the computer, ~ is the folder, and % ends the prompt."
]
},
"n5t1": {
"kind": "term",
"p": "In the practice terminal, type a word that is not a command and press Enter. Then read the error message out loud.",
"check": "unknown",
"h": [
"Any made-up word will do.",
"Try typing banana and pressing Enter.",
"The message “command not found” means the shell has no command with that name."
]
},
"n6t0": {
"kind": "term",
"p": "Using the practice terminal, create python_course, then level0 inside it, and go into level0.",
"check": "level0",
"h": [
"You need mkdir and cd.",
"Make the outer folder first, then go into it.",
"mkdir python_course, then cd python_course, then mkdir level0, then cd level0."
]
},
"n6t1": {
"kind": "term",
"p": "The practice terminal starts inside python_course/level0. Go back to your home folder with one command.",
"cwd": "/Users/ana/python_course/level0",
"dirs": [
"/Users/ana/python_course/level0"
],
"check": "home1",
"h": [
"cd can take you straight home.",
"A tilde (~) means your home folder.",
"Type cd ~ or just cd. If you used more than one command, press Start the terminal again."
]
},
"n7t0": {
"kind": "fill",
"p": "On a Mac, which command shows the version of Python that is installed? Type it exactly.",
"fields": [
{
"l": "Command",
"ph": ""
}
],
"accept": [
"python3 --version",
"python3 -V"
],
"h": [
"It starts with the name of the program.",
"On a Mac the program is python3.",
"python3 --version"
]
},
"n7t1": {
"kind": "choice",
"p": "In PyCharm, where can you see which Python a project uses?",
"opts": [
"In the bottom-right corner of the window",
"In the title of the File menu",
"In the project’s README file",
"In the terminal prompt"
],
"ans": [
0
],
"h": [
"Look at the edges of the window.",
"It is in the status bar along the bottom.",
"The bottom-right corner shows the interpreter."
]
},
"n8t0": {
"kind": "py",
"p": "Write a script that prints three facts about you, each on its own line. Press Run to try it, then check it.",
"check": "lines3",
"h": [
"Each line of output needs its own print.",
"Text goes inside quotes, inside the brackets.",
"For example: print(\"My name is Ana\") on the first line, then two more like it."
]
},
"n8t1": {
"kind": "term",
"p": "hello.py is saved in the python_course folder. In the practice terminal, go to that folder and run it.",
"dirs": [
"/Users/ana/python_course"
],
"files": {
"/Users/ana/python_course/hello.py": "Hello, world!"
},
"check": "ranhello",
"h": [
"First move into the folder that holds the file.",
"cd python_course, then use python3 with the file name.",
"cd python_course, then python3 hello.py"
]
},
"n9t0": {
"kind": "repl",
"p": "Use the practice Python prompt to work out 365 × 24.",
"check": "r8760",
"h": [
"At the Python prompt, a sum is worked out as soon as you press Enter.",
"Python uses * for multiplication.",
"Type 365 * 24 and press Enter."
]
},
"n9t1": {
"kind": "term",
"p": "In the practice terminal, start Python with python3, then leave it with exit. Do this three times, and notice how the prompt changes.",
"check": "py3x",
"h": [
"python3 on its own starts the Python prompt.",
"At >>>, type exit to go back to the shell.",
"Type python3, then exit. Repeat three times."
]
},
"m1t0": {
"kind": "fill",
"p": "Type all 16 patterns that four bits can make, one per line.",
"fields": [
{
"l": "Patterns",
"multi": true
}
],
"check": "bits16",
"h": [
"List them in counting order so none is missed.",
"Start at 0000 and end at 1111.",
"0000, 0001, 0010, 0011, and so on up to 1111."
]
},
"m1t1": {
"kind": "choice",
"p": "A photo’s size is shown as 3 MB. Roughly how many bytes is that?",
"opts": [
"About 3",
"About 3 thousand",
"About 3 million",
"About 3 billion"
],
"ans": [
2
],
"h": [
"What does the M in MB stand for?",
"Mega means million.",
"About 3 million bytes."
]
},
"m2t0": {
"kind": "fill",
"p": "Type your age, then write it in binary.",
"fields": [
{
"l": "Your age",
"ph": "21"
},
{
"l": "Your age in binary",
"ph": "10101"
}
],
"check": "agebin",
"h": [
"Write the position values 64, 32, 16, 8, 4, 2, 1.",
"Start with the largest value that fits, and subtract.",
"For 21: 16 + 4 + 1, so 10101."
]
},
"m2t1": {
"kind": "fill",
"p": "Count from 0 to 15 in binary, one number per line.",
"fields": [
{
"l": "Numbers",
"multi": true
}
],
"check": "count16",
"h": [
"Start at 0 and add one each line.",
"When a position reaches 1 and you add one, it goes back to 0 and the next position goes up.",
"0, 1, 10, 11, 100, 101, and so on up to 1111."
]
},
"m3t0": {
"kind": "repl",
"p": "In the practice Python prompt, use ord on each letter of your first name.",
"check": "ordName",
"h": [
"ord takes one character in quotes.",
"Try ord(\"A\").",
"For Ana: ord(\"A\"), then ord(\"n\"), then ord(\"a\")."
]
},
"m3t1": {
"kind": "repl",
"p": "The numbers 72 and 105 spell a short word. Use chr in the practice prompt to find it.",
"check": "chr72105",
"h": [
"chr is the opposite of ord.",
"chr takes a number and gives back a character.",
"Type chr(72), then chr(105)."
]
},
"m4t0": {
"kind": "repl",
"p": "Use ord on a character from a language other than English, or on an emoji.",
"check": "ordBig",
"h": [
"Paste or type the character inside quotes.",
"Try a Tamil letter such as அ.",
"ord(\"அ\") gives 2949."
]
},
"m4t1": {
"kind": "repl",
"p": "Use chr to find out which character has the number 8377.",
"check": "rupee",
"h": [
"chr turns a number into a character.",
"Put the number inside the brackets.",
"chr(8377)"
]
},
"m5t0": {
"kind": "repl",
"p": "You have 50 rupees and a pen costs 12. In the practice prompt, use two operators to find how many pens you can buy and how much money is left.",
"check": "pens",
"h": [
"One operator gives the whole number of pens, the other gives what is left.",
"Two slashes, and the percent sign.",
"50 // 12, then 50 % 12."
]
},
"m5t1": {
"kind": "repl",
"p": "In the practice prompt, work out how many minutes there are in a week, in one line.",
"check": "week",
"h": [
"A week has 7 days, a day has 24 hours, an hour has 60 minutes.",
"Multiply all three.",
"7 * 24 * 60"
]
},
"m6t0": {
"kind": "py",
"p": "Write a script that stores your age in a variable, works out your age in ten years in a second variable, and prints it.",
"check": "age10",
"h": [
"You need two names and one print.",
"The second variable is the first one plus 10.",
"age = 21, then later = age + 10, then print(later)."
]
},
"m6t1": {
"kind": "py",
"p": "Store a price and a quantity in variables. On a later line, change the quantity, then print the new total.",
"check": "reassign",
"h": [
"A variable can be given a new value.",
"Assign quantity a second time, after the first.",
"price = 12, quantity = 4, quantity = 6, then print(price * quantity)."
]
},
"m7t0": {
"kind": "repl",
"p": "In the practice prompt, use type to check values of your choice, including at least one int, one float, one str and one bool.",
"check": "types4",
"h": [
"type takes any value inside its brackets.",
"Quotes make a str, a decimal point makes a float.",
"type(12), type(3.5), type(\"hi\"), type(True)"
]
},
"m7t1": {
"kind": "py",
"p": "You have the text \"25\" and the number 5. Write one line that prints 30, and another that prints 255.",
"code": "text = \"25\"\nnumber = 5\n",
"check": "t30_255",
"h": [
"To add them, both must be numbers. To join them, both must be text.",
"int turns text into a number, str turns a number into text.",
"print(int(text) + number), then print(text + str(number))."
]
},
"m8t0": {
"kind": "py",
"p": "Store your name and your favourite number in two variables, then print one sentence containing both, using an f-string.",
"check": "fname",
"h": [
"How many pairs of curly brackets will you need?",
"One pair for each variable.",
"Start the string with f, and put each variable name inside its own curly brackets."
]
},
"m8t1": {
"kind": "py",
"p": "Print the result of 10 divided by 3 so that it shows exactly two digits after the decimal point.",
"check": "two_dp",
"h": [
"What can go inside the curly brackets after the value?",
"A colon, followed by a format.",
"print(f\"{10 / 3:.2f}\")"
]
},
"m9t0": {
"kind": "py",
"p": "Ask the user for their favourite food and print a sentence that includes the answer. Type an answer in the box below to try it.",
"tin": [
"dosa"
],
"check": "food",
"h": [
"Where does the answer go once the user has typed it?",
"Store it in a variable.",
"food = input(\"Favourite food? \"), then print(f\"I like {food} too\")."
]
},
"m9t1": {
"kind": "py",
"p": "Write a script that asks a question with input, then prints the answer between two square brackets. Leave the answer box empty, run it, and see what came back.",
"tin": [
""
],
"check": "empty",
"h": [
"How can you make an invisible value visible?",
"Put something visible on each side of it.",
"answer = input(\"Type nothing: \"), then print(f\"[{answer}]\")."
]
},
"m10t0": {
"kind": "py",
"p": "Ask the user for two whole numbers and print their sum.",
"tin": [
"3",
"4"
],
"check": "sum7",
"h": [
"What type does each answer arrive as?",
"Convert each answer before adding.",
"a = int(input(\"First: \")), b = int(input(\"Second: \")), then print(a + b)."
]
},
"m10t1": {
"kind": "py",
"p": "Ask for a price that may include a decimal point, such as 12.50, and print the price of three.",
"tin": [
"12.50"
],
"check": "price3",
"h": [
"Which conversion accepts a decimal point?",
"float does.",
"price = float(input(\"Price: \")), then print(price * 3)."
]
},
"m11t0": {
"kind": "repl",
"p": "In the practice prompt, find two decimal sums that are not exactly what you expect.",
"check": "floats2",
"h": [
"Which decimals do not fit in binary?",
"Try sums that involve tenths.",
"Try 0.1 + 0.7, or 0.1 * 3."
]
},
"m11t1": {
"kind": "py",
"p": "Three items cost 12 rupees 50 paise each. Work out the total using whole numbers only, and print it in rupees and paise.",
"check": "paise",
"h": [
"What is the price of one item in paise?",
"Multiply in paise, then split the result into rupees and paise.",
"total = 1250 * 3, then print(total // 100, \"rupees\", total % 100, \"paise\")."
]
},
"m12t0": {
"kind": "py",
"p": "Add a comment above each group of lines in this script, saying why it is there.",
"code": "price = 12\nquantity = 4\ntotal_amount = price * quantity\nprint(total_amount)\n",
"check": "comments2",
"h": [
"What would you want to know if you opened this file in a month?",
"A comment starts with # and explains the purpose.",
"For example: # Cost of the pens, above the first line."
]
},
"m12t1": {
"kind": "py",
"p": "Comment out one line of this script, run it, and see what changes. Then switch the line back on in your head: what would print?",
"code": "print(\"Start\")\nprint(\"Middle\")\nprint(\"End\")\n",
"check": "commentout",
"h": [
"How do you switch a line off without deleting it?",
"Put a # in front of it.",
"Add # at the start of print(\"Middle\"), then press Run."
]
}
};
for(const n of NODESC.concat(NODES,NODES1))n.T.forEach((t,i)=>{const x=TASKX[n.id+"t"+i];if(x)Object.assign(t,x);});
/* ---------- Details shown on the privacy and contact pages ---------- */
export const LEGAL={owner:"",email:"noolstack@zohomail.in",phone:"8925502706",updated:"25 November 2026"};
/* ---------- Social accounts shown in the footer. Put each account's full link between the quotes. ---------- */
export const SOCIAL={arattai:"",instagram:"",x:""};
