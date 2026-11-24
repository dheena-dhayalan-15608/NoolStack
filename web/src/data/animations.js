import { ERAS } from "./content.js";
/* Step-by-step animations. Each one has a caption per step and a draw(step) function that returns the picture for that step. */
export const CATS=["How computers work","Thinking in steps","Files and the terminal","Python","Data"];
export const aBox=(label,body,hl)=>`<div class="abox${hl?" hl":""}"><span class="alabel">${label}</span><div class="abody">${body||"&nbsp;"}</div></div>`;
export const aCells=cells=>`<div class="acells">${cells.map(c=>`<div class="acell${c.hl?" hl":""}${c.on?" on":""}${c.fill?" fill":""}"><b>${c.v||"&nbsp;"}</b><small>${c.n||""}</small></div>`).join("")}</div>`;
export const ANIMS=[
{id:"history",t:"Two hundred years in six steps",d:"From a design made of gears to a computer in every pocket.",cat:CATS[0],lv:0,lesson:0,nid:"c3",
 cap:ERAS.map(e=>e[2]),
 draw(i){return `<div class="acells">${ERAS.map((e,k)=>`<div class="acell${k===i?" hl":""}${k<=i?" on":""}"><b style="font-size:.74rem">${e[0]}</b></div>`).join("")}</div>${aBox(ERAS[i][0],ERAS[i][1],true)}`;}},
{id:"ipo",t:"Input, processing, output",d:"Follow one sum through a calculator: what goes in, what happens, and what comes out.",cat:CATS[0],lv:0,lesson:1,
 cap:["Input: you press 2, +, 3 and =.","Processing: the phone adds the two numbers. This is the part you never see.","Output: 5 appears on the screen."],
 draw(i){return `<div class="aflow">${aBox("Input","2 + 3 =",i===0)}<span class="aarrow"></span>${aBox("Processing",i===1?"adding 2 and 3":i>1?"done":"",i===1)}<span class="aarrow"></span>${aBox("Output",i>=2?"5":"",i===2)}</div>`;}},
{id:"cpu",t:"Fetch, decode, execute",d:"Watch the CPU take one instruction from RAM, work out what it means, and carry it out.",cat:CATS[0],lv:0,lesson:2,
 cap:["An instruction, 2+3, is waiting in RAM, in locker 05.","Fetch: the CPU takes the instruction out of the locker.","Decode: it works out what the instruction means. Here: add 2 and 3.","Execute: it does the adding. The result is 5.","The result goes back into RAM, and the CPU fetches the next instruction."],
 draw(i){const cells=[["03",""],["04",""],["05","2+3"],["06",i>=4?"5":""],["07","..."],["08",""]];
  return `<div><span class="alabel">RAM, a row of numbered lockers</span>${aCells(cells.map(c=>({n:c[0],v:c[1],on:!!c[1],hl:(i<=1&&c[0]==="05")||(i===4&&c[0]==="06")})))}</div>
  <div class="acpu"><span class="alabel">CPU</span><div class="apills">${["Fetch","Decode","Execute"].map((p,k)=>`<span class="apill${i===k+1?" hl":""}">${k+1}. ${p}</span>`).join("")}</div><div class="areg">${["","2+3","add 2 and 3","5","5"][i]||"&nbsp;"}</div></div>`;}},
{id:"ramssd",t:"Open, type, save, power cut",d:"See why unsaved work vanishes in a power cut, and why saved work survives.",cat:CATS[0],lv:0,lesson:2,
 cap:["Your note is saved on the SSD. RAM is empty.","Open: a copy of the note goes from the SSD into RAM.","Typing changes only the copy in RAM. The SSD still has the old version.","Power cut before saving: RAM is wiped, and the new words are gone.","Power back on. Opening the note brings back only the saved version.","You type the extra words again.","Save: the note is copied from RAM onto the SSD.","Power cut after saving: RAM is wiped again, but nothing is lost."],
 draw(i){const s=[[null,"Buy milk",1,0],["Buy milk","Buy milk",1,1],["Buy milk, eggs","Buy milk",1,1],[null,"Buy milk",0,1],["Buy milk","Buy milk",1,1],["Buy milk, eggs","Buy milk",1,1],["Buy milk, eggs","Buy milk, eggs",1,2],[null,"Buy milk, eggs",0,2]][i];
  return `<p class="apath">Power: <b class="${s[2]?"":"off"}">${s[2]?"on":"off"}</b></p><div class="aflow">${aBox("RAM, needs power to remember",s[0]||"empty",s[3]===1)}<span class="aarrow"></span>${aBox("SSD, keeps data without power",s[1],s[3]===2||i===0)}</div>`;}},
{id:"robot",t:"The step that never stops",d:"A robot follows a counting rule exactly. One small change decides whether it ever finishes.",cat:CATS[1],lv:0,lesson:3,
 cap:["The rule: start at 2, keep adding 2, stop when the number is exactly 9.","4. Not 9 yet, so add 2.","6. Not 9 yet, so add 2.","8. Not 9 yet, so add 2.","10. It jumped straight past 9. The stop condition was never true.","12. It will keep going for ever.","Change the rule to “stop when the number is above 9”, and it stops at 10."],
 draw(i){const v=[2,4,6,8,10,12,10][i];
  return `<p class="apath">Rule: stop when the number is <b>${i<6?"exactly 9":"above 9"}</b></p><div class="anums">${Array.from({length:12},(_,k)=>k+1).map(n=>`<span class="anum${n===9?" target":""}${n===v?(i===6?" good hl":" hl"):""}">${n}</span>`).join("")}</div>`;}},
{id:"path",t:"Walking a path",d:"Build an absolute path from the root, then a relative path from where you are standing.",cat:CATS[2],lv:0,lesson:4,
 cap:["An absolute path starts at the root, written as a single slash.","Go into Users.","Then into ana.","Then into code.","And finally the file. That is the whole absolute path.","Now a relative path. You are standing in notes.","Two dots mean “go up one level”. That takes you to ana.","From there, go down into code.","And name the file. The relative path is complete."],
 draw(i){const nodes=[["/",0],["Users",1],["ana",2],["code",3],["hello.py",4],["notes",3],["todo.txt",4]],act=[0,1,2,3,4,5,2,3,4][i];
  const path=["/","/Users","/Users/ana","/Users/ana/code","/Users/ana/code/hello.py","","..","../code","../code/hello.py"][i];
  return `<div class="atree">${nodes.map((n,k)=>`<div class="anode d${n[1]}${k===act?" hl":""}">${n[0]}${i>=5&&k===5?"<em>you are here</em>":""}</div>`).join("")}</div><p class="apath">${i<5?"Absolute path":"Relative path"} so far: <code>${path||"(nothing yet)"}</code></p>`;}},
{id:"terminal",t:"Four commands in the terminal",d:"Watch pwd, ls, mkdir and cd run one after another, and see what each one prints.",cat:CATS[2],lv:0,lesson:6,
 cap:["The prompt is waiting. The $ sign means the shell is ready for a command.","pwd asks “where am I?” The answer is an absolute path.","ls lists what is inside this folder.","mkdir makes a new folder. It prints nothing when it works.","cd moves into that folder. Notice the prompt change.","pwd again confirms the new position."],
 draw(i){const sc=[["ana ~ $","pwd","/Users/ana"],["ana ~ $","ls","Desktop    Documents"],["ana ~ $","mkdir python_course",""],["ana ~ $","cd python_course",""],["ana python_course $","pwd","/Users/ana/python_course"]];
  let out="";for(let k=0;k<i;k++)out+=`<span class="dim">${sc[k][0]}</span> ${sc[k][1]}\n${sc[k][2]?sc[k][2]+"\n":""}`;
  return `<div class="termbox aterm">${out}<span class="dim">${i>=4?"ana python_course $":"ana ~ $"}</span> ▌</div>`;}},
{id:"prompts",t:"Two prompts, two worlds",d:"The shell and Python each expect their own kind of typing. See what happens when you mix them up.",cat:CATS[2],lv:0,lesson:9,
 cap:["At the shell prompt you type commands. This one asks Python to run a script.","At the Python prompt you type Python code. It answers straight away.","A shell command typed at the Python prompt is an error.","And Python code typed at the shell prompt is an error too. Check the prompt before you type."],
 draw(i){const sh=i===0?`$ python3 hello.py\nHello World`:i===3?`$ print("hi")\n<span class="err">an error from the shell</span>`:"$ ▌";
  const py=i===1?`&gt;&gt;&gt; 2 + 3\n5`:i===2?`&gt;&gt;&gt; python3 hello.py\n<span class="err">SyntaxError: invalid syntax</span>`:"&gt;&gt;&gt; ▌";
  return `<div class="apanels"><div class="apanel${i===0||i===3?" act":""}"><span class="alabel">The shell</span>${sh}</div><div class="apanel${i===1||i===2?" act":""}"><span class="alabel">Python</span>${py}</div></div>`;}},
{id:"script",t:"A script runs top to bottom",d:"Three lines of Python run one at a time, and the quotes decide what each one shows.",cat:CATS[3],lv:0,lesson:8,
 cap:["Python starts at the top of the file.","Line 1 runs. Text in quotes is shown exactly as written.","Line 2 runs. The quotes make it text, so no sum is done.","Line 3 runs. There are no quotes, so Python works out the sum first."],
 draw(i){const code=['print("Hello")','print("2 + 3")','print(2 + 3)'],out=["Hello","2 + 3","5"];
  return `<div class="acode">${code.map((c,k)=>`<div class="${k===i-1?"act":""}">${c.replace(/"/g,"&quot;")}</div>`).join("")}</div><div><span class="alabel">What appears</span><div class="termbox aterm" style="min-height:5.5rem">${out.slice(0,i).join("\n")}</div></div>`;}},
{id:"bits",t:"Counting with three bits",d:"Three on-or-off switches, and every pattern they can make.",cat:CATS[4],lv:1,lesson:1,
 cap:Array.from({length:8},(_,i)=>i<7?"Pattern "+(i+1)+" of 8: "+i.toString(2).padStart(3,"0")+".":"Pattern 8 of 8: 111. One bit gives 2 patterns, two bits give 4, three bits give 8. Every extra bit doubles the count."),
 draw(i){const b=i.toString(2).padStart(3,"0").split("");
  return `<div class="acells" style="max-width:16rem">${b.map(x=>`<div class="acell${x==="1"?" fill":""}"><b>${x}</b><small>${x==="1"?"on":"off"}</small></div>`).join("")}</div>`;}},
{id:"binary",t:"Reading a binary number",d:"Turn the pattern 1011 into an everyday number, one position at a time.",cat:CATS[4],lv:1,lesson:2,
 cap:["Write the position values under the bits: 8, 4, 2 and 1. Each is double the one to its right.","The 8 position is on. Total so far: 8.","The 4 position is off, so skip it.","The 2 position is on. Total so far: 8 + 2 = 10.","The 1 position is on. Total: 8 + 2 + 1 = 11. So 1011 is 11."],
 draw(i){const b=[1,0,1,1],v=[8,4,2,1],tot=[0,8,8,10,11][i];
  return `<div class="acells" style="max-width:18rem">${b.map((x,k)=>`<div class="acell${x?" on":""}${k===i-1?" hl":""}"><b>${x}</b><small>${v[k]}</small></div>`).join("")}</div><p class="apath">Total so far: <b>${tot}</b></p>`;}},
{id:"ascii",t:"How text is stored",d:"Follow the word CAB as each letter becomes a number, and each number becomes a byte.",cat:CATS[4],lv:1,lesson:3,
 cap:["The word CAB has three characters.","C is looked up in the ASCII table: 67.","A is 65.","B is 66.","Each number is stored as one byte, so the word takes three bytes."],
 draw(i){const w=[["C",67,"01000011"],["A",65,"01000001"],["B",66,"01000010"]];
  return `<div class="aflow">${w.map((x,k)=>aBox("Character "+x[0],i>k?(i===4?x[2]:String(x[1])):"",i===k+1||i===4)).join("")}</div><p class="apath">${i===4?"Stored as bytes":"Numbers from the ASCII table"}</p>`;}},
{id:"unicode",t:"One table for every language",d:"See how characters from different scripts get bigger numbers, and need more bytes to store.",cat:CATS[4],lv:1,lesson:4,
 cap:["ASCII has 128 numbers, enough for English. Unicode carries on from there.","A is 65, the same as in ASCII. It takes 1 byte.","é is 233. It is outside ASCII, so it takes 2 bytes.","The Tamil letter அ is 2949. It takes 3 bytes.","The emoji is 128512. It takes 4 bytes. Bigger numbers need more bytes."],
 draw(i){const w=[["A",65,1],["é",233,2],["அ",2949,3],["😀",128512,4]];
  return `<div class="aflow">${w.map((x,k)=>aBox(x[0],i>k?x[1]+"<br>"+x[2]+(x[2]===1?" byte":" bytes"):"",i===k+1)).join("")}</div><p class="apath">Unicode number, and bytes used in UTF-8</p>`;}},
{id:"share",t:"Sharing with a remainder",d:"Share 17 sweets among 5 friends, and see what the two division operators each tell you.",cat:CATS[3],lv:1,lesson:5,
 cap:["17 sweets, 5 friends. Nobody has any yet.","Give one to each friend. That uses 5, so 12 are left.","A second round. Each friend has 2, and 7 are left.","A third round. Each friend has 3, and 2 are left.","2 is not enough for another round. So 17 // 5 is 3, and 17 % 5 is 2."],
 draw(i){const each=[0,1,2,3,3][i],left=17-each*5;
  return `<div class="aflow">${aBox("Each friend has",String(each),i>0&&i<4)}${aBox("Sweets left in the bag",String(left),i>0&&i<4)}</div><div class="aflow">${aBox("17 // 5",i===4?"3":"",i===4)}${aBox("17 % 5",i===4?"2":"",i===4)}</div>`;}},
{id:"variable",t:"A name points at a value",d:"See what assignment really does, and what happens when a variable is given a new value.",cat:CATS[3],lv:1,lesson:6,
 cap:["Nothing is stored yet.","sweets = 17. The value 17 is put in memory, and the name sweets points at it.","sweets = sweets + 3. Python works out the right side first: 17 + 3 is 20.","Now the name sweets points at 20. The old value, 17, is forgotten."],
 draw(i){return `<div class="aflow">${aBox("Name",i>=1?"sweets":"",i===1)}<span class="aarrow"></span>${aBox("Value in memory",i===0?"":i<3?"17":"20",i===1||i===3)}</div><div class="aflow">${aBox("Working out the right side",i===2?"17 + 3 = 20":"",i===2)}</div>`;}},
{id:"plus",t:"One plus sign, two jobs",d:"The same symbol adds numbers and joins text. See how the types decide, and what happens when they do not match.",cat:CATS[3],lv:1,lesson:7,
 cap:["Two ints. The plus sign adds them.","Two strings. The plus sign joins them end to end.","A string and an int. Python will not guess which you meant, so it raises a TypeError.","Convert the text to a number with int, and it becomes addition.","Convert the number to text with str, and it becomes joining."],
 draw(i){const s=[["12 + 3","15","int + int"],["&quot;12&quot; + &quot;3&quot;","'123'","str + str"],["&quot;12&quot; + 3","TypeError","str + int"],["int(&quot;12&quot;) + 3","15","int + int"],["&quot;12&quot; + str(3)","'123'","str + str"]][i];
  return `<div class="aflow">${aBox("You type",s[0],false)}<span class="aarrow"></span>${aBox("Python gives",s[1],true)}</div><p class="apath">Types on each side: <b>${s[2]}</b></p>`;}},
{id:"fstring",t:"How an f-string fills its blanks",d:"Watch Python find the curly brackets, look up the name, and build the finished sentence.",cat:CATS[3],lv:1,lesson:8,
 cap:["The variable sweets refers to 17. The string starts with f, so Python treats it as a template.","Python finds the curly brackets and reads the name inside them.","It looks the name up. sweets is 17.","The value is placed into the text, and the finished sentence is printed.","Without the f, nothing is looked up. The brackets are printed exactly as typed."],
 draw(i){const t=i===4?"&quot;I have {sweets} sweets&quot;":"f&quot;I have {sweets} sweets&quot;";
  return `<div class="aflow">${aBox("The string",t,i===0||i===4)}${aBox("Inside the brackets",i>=1&&i<4?(i===1?"sweets":"sweets is 17"):"",i===1||i===2)}</div><div class="aflow">${aBox("What is printed",i===3?"I have 17 sweets":i===4?"I have {sweets} sweets":"",i>=3)}</div>`;}},
{id:"input",t:"A program that waits for you",d:"See what happens at an input line: the message, the pause, and what comes back.",cat:CATS[3],lv:1,lesson:9,
 cap:["The program reaches the input line and shows its message.","It pauses. Nothing else runs while it waits.","The user types 25 and presses Return.","input gives back the text \"25\". It is a str, not a number."],
 draw(i){return `<div class="aflow">${aBox("The program","age = input(&quot;Age? &quot;)",i<=1)}<span class="aarrow"></span>${aBox("The user",i===1?"waiting":i>=2?"types 25":"",i===2)}</div><div class="aflow">${aBox("age now refers to",i===3?"&quot;25&quot;, a str":"",i===3)}</div>`;}},
{id:"convert",t:"From text to number",d:"Follow an answer from the keyboard as int turns it into a number, and see what happens when it cannot.",cat:CATS[3],lv:1,lesson:10,
 cap:["input gave back the text \"25\".","int reads the text and builds the number 25.","Now arithmetic works: 25 + 1 is 26.","Text that is not a whole number cannot be converted. int(\"abc\") raises a ValueError."],
 draw(i){const t=i===3?"&quot;abc&quot;":"&quot;25&quot;";
  return `<div class="aflow">${aBox("Text",t,i===0)}<span class="aarrow"></span>${aBox("int( )",i===0?"":i===3?"cannot read it":"reading",i===1)}<span class="aarrow"></span>${aBox("Result",i===0?"":i===1?"25":i===2?"25 + 1 = 26":"ValueError",i>=2)}</div>`;}},
{id:"float",t:"Why a tenth never quite fits",d:"Try to build 0.1 out of halves, quarters and smaller binary pieces, and see why it can only ever be close.",cat:CATS[4],lv:1,lesson:11,
 cap:["0.5 is one half. Binary has a piece that size, so it is stored exactly.","0.1 is harder. The first piece small enough to use is a sixteenth: 0.0625.","Add a thirty-second. Now 0.09375. Closer.","Add two smaller pieces. Now 0.099609375. Closer still.","The pattern repeats for ever, so it never lands on 0.1. Python stops at 64 bits and keeps the nearest value it reached."],
 draw(i){const v=["0.5","0.0625","0.09375","0.099609375","very nearly 0.1"][i];
  return `<div class="aflow">${aBox("Target",i===0?"0.5":"0.1",false)}<span class="aarrow"></span>${aBox("Built from binary pieces",v,true)}</div><p class="apath">${i===0?"Exact":"Not exact, only close"}</p>`;}},
{id:"comment",t:"What Python skips",d:"Three lines, three hash signs, and three different outcomes.",cat:CATS[3],lv:1,lesson:12,
 cap:["Three lines of code, each with a hash sign in it.","Line 1 starts with a hash. The whole line is a comment, so nothing runs.","On line 2, the code before the hash runs and prints two. The rest is ignored.","On line 3 the hash is inside the quotes. It is ordinary text, so it is printed."],
 draw(i){const code=['# print(&quot;one&quot;)','print(&quot;two&quot;)  # print(&quot;three&quot;)','print(&quot;# four&quot;)'],out=["","","two","two\n# four"][i];
  return `<div class="acode">${code.map((c,k)=>`<div class="${k===i-1?"act":""}">${c}</div>`).join("")}</div><div><span class="alabel">What appears</span><div class="termbox aterm" style="min-height:4.5rem">${out}</div></div>`;}}
];
