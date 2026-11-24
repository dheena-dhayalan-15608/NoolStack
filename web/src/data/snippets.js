/* Snippets: short narrated videos (1 to 3 minutes).
   Each ready snippet has an MP4 video with a voice, a captions file and chapters.
   The scene texts below are the narration script; the videos are made from them with the
   build tools (an offline voice and frame-by-frame rendering of the scene drawings). */
export const SNIPPETS=[
 {id:"computer",t:"How a computer works",ready:true,video:"snippets/computer.mp4",webm:"snippets/computer.webm",poster:"snippets/computer-poster.jpg",vtt:"snippets/computer.en.vtt",dur:100.962,chapters:[0.0, 13.444, 23.56, 37.26, 49.312, 68.512, 75.31, 87.986],
  d:"Follow one sum, 2 + 3, from the keyboard through memory and the processor to the screen, and see why saving matters.",
  scenes:[
   {t:"How a computer works",say:"Every computer, from a phone to a laptop, does the same four things. It takes input, it processes it, it shows output, and it stores what matters. Let's follow one small sum, two plus three, all the way through."},
   {t:"1. Input",say:"First, input. You press the keys two, plus, and three. Each key press becomes an electrical signal that travels into the computer."},
   {t:"2. Everything becomes numbers",say:"Inside the computer, everything is a number. The character two is stored as the number fifty. In binary, that is zero zero one one zero zero one zero: eight tiny on and off switches called bits."},
   {t:"3. Memory (RAM)",say:"These numbers are kept in RAM, the computer's short-term memory. Picture RAM as a long row of numbered lockers. Our sum, two plus three, waits in locker zero five."},
   {t:"4. Processing (CPU)",say:"Now the CPU, the brain of the computer, gets to work. It fetches the instruction from the locker. It decodes it, which means working out what it asks for: add two and three. Then it executes it, and the answer is five. A CPU repeats this cycle billions of times every second."},
   {t:"5. Output",say:"The answer goes back into memory, and then to the screen. Seeing the five appear is the output."},
   {t:"6. Storage",say:"There is one catch. RAM forgets everything the moment the power goes off. So when you save, the computer copies your work to storage, such as an SSD, which remembers it even without power."},
   {t:"Putting it together",say:"So, input goes in. The CPU processes it, using memory. Output comes out. And storage keeps your work safe. That is how every computer works."}
  ]},
 {id:"interpreter",t:"How Python runs your code",ready:false,d:"What an interpreter does with your program, one line at a time."},
 {id:"upi",t:"What happens when you scan a QR code to pay",ready:false,d:"The journey of a UPI payment, from your phone to the shop’s bank account, in a few seconds."},
 {id:"encryption",t:"Are your chat messages really private?",ready:false,d:"How end-to-end encryption lets only the person you message read what you send."}
];
