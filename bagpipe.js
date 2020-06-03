const notes = document.getElementById('notes');
const scale = ['lg', 'la', 'b','c','d','e','f','hg','ha'];
const keys = ['g','a','b','c','d','e','f','G','A'];
let level = 1;
let doclistener;
const affirmative = ['Way to go!', 'Nice!', 'You are doing great!', 'Bagpipe pro here!', 'A true Scotsman!'];
let incorrect = {
    g: 0,
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    G: 0,
    A: 0,
}
while (notes.firstChild) {
    notes.removeChild(notes.lastChild);
}



const game = document.getElementById('music');
const tutorial = {
    init() {
        while (game.firstChild) {
            game.removeChild(game.lastChild);
        }
        var header = document.createElement('h1');
        header.appendChild(document.createTextNode('Tutorial - Notes'));
        game.appendChild(header);
        var text = document.createElement('p');
        text.appendChild(document.createTextNode('Welcome to the Chanter Note Practice lesson! Here, you will see a set of notes, and you have to press the name of the correct note on your keyboard. Press this note\'s name on your keyboard.'))
        game.appendChild(text);
        var notes = getNotes(['cleff','b']);
        var staff = notesToElement(notes);
        staff.style.clear = 'both';
        game.appendChild(staff);
        var hint = document.createElement('i');
        hint.appendChild(document.createTextNode('Hint: It\'s B!'));
        game.appendChild(hint);
        var feedback = document.createElement('p');
        game.appendChild(feedback);

        doclistener = (key) => {
            console.log(key);
            if(keys.includes(key.key))
                if(key.code=='KeyB') {
                    document.removeEventListener('keypress', doclistener);
                    this.sets();
                    hundred();
                } else {
                    
                    notes[1].className = 'note wrong';
                }
            if(key.getModifierState('CapsLock')) {
                feedback.innerText = "Whoops! Make sure CapsLock is off!"
            } else {
                feedback.innerText = "Whoops! The answer is B."
            }
        };
        document.addEventListener('keypress', doclistener);
    },
    sets() {
        while (game.firstChild) {
            game.removeChild(game.lastChild);
        }
        var header = document.createElement('h1');
        header.appendChild(document.createTextNode('Tutorial - Lots of Notes'));
        game.appendChild(header);
        var text = document.createElement('p');
        text.appendChild(document.createTextNode('Let\'s try the same thing, but with several notes. You can see the staff has several notes on it now. The first one has a box around it. This means that is the current note. Press it\'s value.'))
        game.appendChild(text);
        var answers = ['b','c','d','e'];
        var notes = getNotes(['cleff'].concat(answers));
        notes[1].className = 'note active';
        var staff = notesToElement(notes);
        staff.style.clear = 'both';
        game.appendChild(staff);
        var feedback = document.createElement('p');
        game.appendChild(feedback);
        var pos = 1;
        var correct = 0;
        doclistener = (key) => {
            if(keys.includes(key.key)) {
                if(key.key==answers[pos-1] && pos<notes.length) { //pos is for notes, which has a cleff at the beginning, so we subtract one to account for that.
                    notes[pos].className = 'note right';
                    feedback.innerText = affirmative[Math.floor(Math.random()*affirmative.length)];
                    correct++;
                    pos++;
                } else {
                    notes[pos].className = 'note wrong';
                    if(key.getModifierState("CapsLock")) {
                        feedback.innerText = `Make sure Caps Lock is turned off! You may retry this one.`;
                    } else {
                        pos++;
                        feedback.innerText = `Whoops! The answer was ${noteToEnglish(answers[pos-1])}`;
                    }
                }
                if(pos==1) text.innerText = "Cool! You pressed a note, and now you are on the next one. If you got the note right, it turns green! If you got it wrong, it turns red, but it also tells you the answer below, so you can learn! Don't worry if you got it wrong, this is just a tutorial. Keep until you hit the end."
                if(answers.length>=pos) notes[pos].className = 'note active';
                else {
                    document.removeEventListener('keypress', doclistener);
                    var button = document.createElement('button');
                    button.innerText = 'Continue';
                    game.appendChild(button);
                    button.addEventListener('click', this.highlow);
                    if(correct==answers.length) hundred();
                    setProgress(0,50);
                }
            } else if(key.getModifierState("CapsLock")) {
                feedback.innerText = `Make sure Caps Lock is turned off! You may retry this one.`;
            }
        }
        document.addEventListener('keypress', doclistener);
    },
    highlow() {
        while (game.firstChild) {
            game.removeChild(game.lastChild);
        }
        var header = document.createElement('h1');
        header.appendChild(document.createTextNode('Tutorial - High and Low'));
        game.appendChild(header);
        var text = document.createElement('p');
        text.appendChild(document.createTextNode('I hope you are enjoying this so far. Let\'s take a look at High notes and Low notes. So far, a name only referred to one note, but A? G? This practice site uses Capital A to refer to High A, and lowercase A to refer to Low A. Try it now! Press Shift + A to get a High A.'));
        game.appendChild(text);
        var answers = ['A','a','G','g'];
        var correct = 0;
        var notes = getNotes(['cleff'].concat(answers));
        notes[1].className = 'note active';
        var staff = notesToElement(notes);
        staff.style.clear = 'both';
        game.appendChild(staff);
        var feedback = document.createElement('p');
        game.appendChild(feedback);
        var pos = 1;
        doclistener = (key) => {
            if(keys.includes(key.key)) {
                if(key.key==answers[pos-1] && pos<notes.length) { //pos is for notes, which has a cleff at the beginning, so we subtract one to account for that.
                    notes[pos].className = 'note right';
                    feedback.innerText = affirmative[Math.floor(Math.random()*affirmative.length)];
                    correct++;
                    if(pos==1) text.innerText = "Sweet! Now, just press lowercase 'a', without the Shift key, to put a Low A.";
                    if(pos==2) text.innerText = "Halfway there! Next is High G. Use the exact same method as before, but with G instead.";
                    if(pos==3) text.innerText = "One last note: Low G. Just press 'g'.";
                    if(notes.length>pos+1) notes[pos+1].className = 'note active';
                    else {
                        var success = document.createElement('p');
                        success.innerText = "Brilliant! You are ready to begin conquering the lessons!";
                        game.appendChild(success);
                        document.removeEventListener('keypress', doclistener);
                        var button = document.createElement('button');
                        button.innerText = 'Go to Level 1';
                        game.appendChild(button);
                        button.addEventListener('click', ()=>{gotoLevel('1')});
                        if(correct==answers.length) hundred();
                        setProgress(0,100);
                    }
                    pos++;
                } else {
                    notes[pos].className = 'note wrong active';
                    if(key.getModifierState("CapsLock")) {
                        feedback.innerText = `Make sure Caps Lock is turned off! You may retry this one.`;
                    } else
                    feedback.innerText = `Whoops! The answer was ${noteToEnglish(answers[pos-1])}. For the purpose of this tutorial, you may retry.`;
                }
                
            } else if(key.getModifierState("CapsLock")) {
                feedback.innerText = `Make sure Caps Lock is turned off! You may retry this one.`;
            }
        }
        document.addEventListener('keypress', doclistener);
    },
    interact(notename) {

    }
}

const lvl1 = {
    init() {
        while (game.firstChild) {
            game.removeChild(game.lastChild);
        }
        var header = document.createElement('h1');
        header.appendChild(document.createTextNode('Level 1 - Intro'));
        game.appendChild(header);
        var text = document.createElement('p');
        text.appendChild(document.createTextNode('Welcome to Level One. Don\'t worry, this will be easy!'));
        game.appendChild(text);
        var button = document.createElement('button');
        button.innerText = 'Contiue to Scale Up';
        game.appendChild(button);
        button.addEventListener('click', this.scaleup);
    },
    scaleup() {
        while (game.firstChild) {
            game.removeChild(game.lastChild);
        }
        var header = document.createElement('h1');
        header.appendChild(document.createTextNode('Level 1 - Scale Up'));
        game.appendChild(header);
        var text = document.createElement('p');
        text.appendChild(document.createTextNode('Let us scale things up a notch! Okay, no puns. Let\'s head up the scale!'))
        game.appendChild(text);
        var answers = ['g','a','b','c','d','e','f','G','A'];
        var notes = getNotes(['cleff'].concat(answers));
        notes[1].className = 'note active';
        var staff = notesToElement(notes);
        staff.style.clear = 'both';
        game.appendChild(staff);
        var feedback = document.createElement('p');
        game.appendChild(feedback);
        var pos = 1;
        var correct = 0;
        doclistener = (key) => {
            if(keys.includes(key.key)) {
                if(key.key==answers[pos-1] && pos<notes.length) { //pos is for notes, which has a cleff at the beginning, so we subtract one to account for that.
                    notes[pos].className = 'note right';
                    feedback.innerText = affirmative[Math.floor(Math.random()*affirmative.length)];
                    correct++;
                    pos++;
                } else {
                    notes[pos].className = 'note wrong';
                    if(key.getModifierState("CapsLock")) {
                        feedback.innerText = `Make sure Caps Lock is turned off! You may retry this one.`;
                    } else {
                        feedback.innerText = `Whoops! The answer was ${noteToEnglish(answers[pos-1])}`;
                        incorrect[answers[pos-1]]++;
                        pos++;
                    }
                }
                if(answers.length>=pos) notes[pos].className = 'note active';
                else {
                    var button = document.createElement('button');
                    button.innerText = 'Continue';
                    button.addEventListener('click', lvl1.scaledown);
                    game.appendChild(button);
                    if(correct==answers.length) hundred();
                    document.removeEventListener('keypress', doclistener);
                    setProgress(1,33);
                }
            } else if(key.getModifierState("CapsLock")) {
                feedback.innerText = `Make sure Caps Lock is turned off! You may retry this one.`;
            }
        }
        document.addEventListener('keypress', doclistener);
    },
    scaledown() {
        while (game.firstChild) {
            game.removeChild(game.lastChild);
        }
        var header = document.createElement('h1');
        header.appendChild(document.createTextNode('Level 1 - Scale Down'));
        game.appendChild(header);
        var text = document.createElement('p');
        text.appendChild(document.createTextNode('Woah! I can see my house from here! We should head back down the scale.'))
        game.appendChild(text);
        var answers = ['A','G','f','e','d','c','b','a','g'];
        var notes = getNotes(['cleff'].concat(answers));
        notes[1].className = 'note active';
        var staff = notesToElement(notes);
        staff.style.clear = 'both';
        game.appendChild(staff);
        var feedback = document.createElement('p');
        game.appendChild(feedback);
        var pos = 1;
        var correct = 0;
        doclistener = (key) => {
            if(keys.includes(key.key)) {
                if(key.key==answers[pos-1] && pos<notes.length) { //pos is for notes, which has a cleff at the beginning, so we subtract one to account for that.
                    notes[pos].className = 'note right';
                    feedback.innerText = affirmative[Math.floor(Math.random()*affirmative.length)];
                    correct++;
                    pos++;
                } else {
                    notes[pos].className = 'note wrong';
                    if(key.getModifierState("CapsLock")) {
                        feedback.innerText = `Make sure Caps Lock is turned off! You may retry this one.`;
                    } else {
                        feedback.innerText = `Whoops! The answer was ${noteToEnglish(answers[pos-1])}`;
                        incorrect[answers[pos-1]]++;
                        pos++;
                    }
                }
                if(answers.length>=pos) notes[pos].className = 'note active';
                else {
                    document.removeEventListener('keypress', doclistener);
                    var button = document.createElement('button');
                    button.innerText = 'Continue';
                    button.addEventListener('click', lvl1.gauntletintro);
                    game.appendChild(button);
                    if(correct==answers.length) hundred();
                    document.removeEventListener('keypress', doclistener);
                    setProgress(1,66);
                }
            } else if(key.getModifierState("CapsLock")) {
                feedback.innerText = `Make sure Caps Lock is turned off! You may retry this one.`;
            }
        }
        document.addEventListener('keypress', doclistener);
    },
    gauntletintro() {
        while (game.firstChild) {
            game.removeChild(game.lastChild);
        }
        var header = document.createElement('h1');
        header.appendChild(document.createTextNode('Level 1 - Full Scale Gauntlet'));
        game.appendChild(header);
        var text = document.createElement('p');
        text.appendChild(document.createTextNode('What!? A Gauntlet!? You made it to your first Gauntlet! A Gauntlet is a special challenge that tests your skills! Every gauntlet is different. Here are this gauntlet\'s rules:'));
        
        var rules = document.createElement('ol');
        var rulelist = ['The gauntlet will consist of the full scale, up and down','You have 60 seconds to complete the gauntlet', 'You will have to retry incorrect answers until they are correct','Your score is determined by the time you take to complete and the amount of incorrect answers.'];
        for(var i of rulelist) {
            var li = document.createElement('li');
            li.innerText = i;
            rules.appendChild(li);
        }
        text.appendChild(rules)
        text.appendChild(document.createTextNode('Don\'t worry about passing it. It is supposed to be a fun challenge. You may retry it as many times as you wish. It will begin the instant you click the button below, so be prepared!'));
        game.appendChild(text);
        var button = document.createElement('button');
        button.innerText = 'Proceed to Gauntlet';
        game.appendChild(button);
        button.addEventListener('click', lvl1.gauntlet);
    },
    gauntlet() {
        document.removeEventListener('keypress', doclistener);
        while (game.firstChild) {
            game.removeChild(game.lastChild);
        }
        var header = document.createElement('h1');
        header.appendChild(document.createTextNode('Level 1 - Full Scale Gauntlet'));
        game.appendChild(header);
        var timer = document.createElement('h1');
        timer.style.fontSize = "60px";
        timeLeft = 60;
        timer.innerText = timeLeft;
        game.appendChild(timer);
        var text = document.createElement('p');
        game.appendChild(text);
        var countdown = setInterval(() => {
            if(timeLeft<=0) {
                clearTimeout(countdown);
                timer.innerHTML = "Ran out of time! Try again?";
                game.removeChild(staff);
                document.removeEventListener('keypress', doclistener);
                var button = document.createElement('button');
                button.innerText = 'Retry';
                game.appendChild(button);
                button.addEventListener('click', lvl1.gauntletintro);
            }
            timeLeft-=0.01;
            timer.innerHTML = Math.floor(timeLeft) + "<span style='font-size:30px;'>" + (timeLeft-Math.floor(timeLeft)+"").substring(2,4) + "</span>";
        },10);
        var calculate = () => {
            var score = 100;
            if(timeLeft<30)
            score+=(Math.round(timeLeft)-30); //subtract seconds since 30
            score-=wrong;
            console.log(score);
            if(score<76 && score > 50) score = 76;  // score cannot go below 76 so people don't feel bad.
                                                    // At the same time, if the score is below 50%, they were trying to get a bad score. Let's not dissapoint them.
            if(score<0) score = 0;
            timer.innerHTML = "You beat the Gauntlet! Final Score: " + score + "%";
            
            text.appendChild(document.createTextNode('You can now attempt the gauntlet at any time on the left-hand side'));
        }
        

        var answers = ['g','a','b','c','d','e','f','G','A','G','f','e','d','c','b','a','g'];
        var todo = [];
        for(var i in answers) todo.push(parseInt(i));
        var wrong = 0;
        var notes = getNotes(['cleff'].concat(answers));
        notes[1].className = 'note active';
        var staff = notesToElement(notes);
        staff.style.clear = 'both';
        game.appendChild(staff);
        var feedback = document.createElement('p');
        game.appendChild(feedback);
        var pos = 1;
        doclistener = (key) => {
            console.log(todo,pos)
            if(keys.includes(key.key)) {
                if(key.key==answers[todo[pos-1]] && pos<notes.length) { //pos is for notes, which has a cleff at the beginning, so we subtract one to account for that.
                    notes[todo[pos-1]+1].className = 'note right';
                    feedback.innerText = '';
                    todo.splice(pos-1,1)
                } else {
                    notes[todo[pos-1]+1].className = 'note wrong';
                    if(key.getModifierState("CapsLock")) {
                        feedback.innerText = `Make sure Caps Lock is turned off! You may retry this one.`;
                    } else {
                        feedback.innerText = `Whoops! The answer was ${noteToEnglish(answers[todo[pos-1]])}`;
                        incorrect[answers[todo[pos-1]]]++;
                        wrong++;
                        pos++;
                    }
                }
                if(todo.length>=pos) notes[todo[pos-1]+1].className = 'note active';
                else if(todo.length!=0) {
                    pos = 1;
                    notes[todo[pos-1]+1].className = 'note active';
                } else {
                    clearTimeout(countdown);
                    calculate();
                    document.removeEventListener('keypress', doclistener);
                    var button = document.createElement('button');
                    button.innerText = 'Continue to Level 2';
                    game.appendChild(button);
                    button.addEventListener('click', lvl1.gauntletintro);
                    var retry = document.createElement('button');
                    retry.innerText = 'Retry Gauntlet';
                    game.appendChild(retry);
                    retry.addEventListener('click', lvl1.gauntletintro);
                    setProgress(1,100);
                    unlock('gauntlet1');
                }
            } else if(key.getModifierState("CapsLock")) {
                feedback.innerText = `Make sure Caps Lock is turned off! You may retry this one.`;
            }
        }
        document.addEventListener('keypress', doclistener);
    }
}

const lvl2 = {
    init() {
        while (game.firstChild) {
            game.removeChild(game.lastChild);
        }
        var header = document.createElement('h1');
        header.appendChild(document.createTextNode('Level 2 - Intro'));
        game.appendChild(header);
        var text = document.createElement('p');
        text.appendChild(document.createTextNode('Welcome to Level Two! This time, we will be working with random notes.'));
        game.appendChild(text);
        var button = document.createElement('button');
        button.innerText = 'Continue';
        game.appendChild(button);
        button.addEventListener('click', this.randomMusic);
    },
    randomMusic() {
        while (game.firstChild) {
            game.removeChild(game.lastChild);
        }
        var header = document.createElement('h1');
        header.appendChild(document.createTextNode('Level 2 - Random Notes'));
        game.appendChild(header);
        var text = document.createElement('p');
        text.appendChild(document.createTextNode('This is a set of randomly generated music! It probably won\'t sound any good, but is great for practice! The music is different each time, so come back for varied practice.'))
        game.appendChild(text);
        var answers = [];
        for(var i = 0; i < 8; i++) {
            answers.push(keys[Math.floor(Math.random()*keys.length)]);
        }
        var notes = getNotes(['cleff'].concat(answers));
        notes[1].className = 'note active';
        var staff = notesToElement(notes);
        staff.style.clear = 'both';
        game.appendChild(staff);
        var feedback = document.createElement('p');
        game.appendChild(feedback);
        var pos = 1;
        var correct = 0;
        doclistener = (key) => {
            if(keys.includes(key.key)) {
                if(key.key==answers[pos-1] && pos<notes.length) { //pos is for notes, which has a cleff at the beginning, so we subtract one to account for that.
                    notes[pos].className = 'note right';
                    feedback.innerText = affirmative[Math.floor(Math.random()*affirmative.length)];
                    correct++;
                    pos++;
                } else {
                    notes[pos].className = 'note wrong';
                    if(key.getModifierState("CapsLock")) {
                        feedback.innerText = `Make sure Caps Lock is turned off! You may retry this one.`;
                    } else {
                        feedback.innerText = `Whoops! The answer was ${noteToEnglish(answers[pos-1])}`;
                        incorrect[answers[pos-1]]++;
                        pos++;
                    }
                }
                if(answers.length>=pos) notes[pos].className = 'note active';
                else {
                    document.removeEventListener('keypress', doclistener);
                    var button = document.createElement('button');
                    button.innerText = 'Continue';
                    button.addEventListener('click', this.randomLong);
                    game.appendChild(button);
                    if(correct==answers.length) hundred();
                    setProgress(2,25);
                }
            } else if(key.getModifierState("CapsLock")) {
                feedback.innerText = `Make sure Caps Lock is turned off! You may retry this one.`;
            }
        }
        document.addEventListener('keypress', doclistener);
    },
    randomLong() {
        while (game.firstChild) {
            game.removeChild(game.lastChild);
        }
        var header = document.createElement('h1');
        header.appendChild(document.createTextNode('Level 2 - Random Notes'));
        game.appendChild(header);
        var text = document.createElement('p');
        text.appendChild(document.createTextNode('Here is a bunch more to try. The music is different each time, so come back for varied practice.'))
        game.appendChild(text);
        var answers = [];
        for(var i = 0; i < 20; i++) {
            answers.push(keys[Math.floor(Math.random()*keys.length)]);
        }
        var notes = getNotes(['cleff'].concat(answers));
        notes[1].className = 'note active';
        var staff = notesToElement(notes);
        staff.style.clear = 'both';
        game.appendChild(staff);
        var feedback = document.createElement('p');
        game.appendChild(feedback);
        var pos = 1;
        var correct = 0;
        doclistener = (key) => {
            if(keys.includes(key.key)) {
                if(key.key==answers[pos-1] && pos<notes.length) { //pos is for notes, which has a cleff at the beginning, so we subtract one to account for that.
                    notes[pos].className = 'note right';
                    feedback.innerText = affirmative[Math.floor(Math.random()*affirmative.length)];
                    correct++;
                    pos++;
                } else {
                    notes[pos].className = 'note wrong';
                    if(key.getModifierState("CapsLock")) {
                        feedback.innerText = `Make sure Caps Lock is turned off! You may retry this one.`;
                    } else {
                        feedback.innerText = `Whoops! The answer was ${noteToEnglish(answers[pos-1])}`;
                        incorrect[answers[pos-1]]++;
                        pos++;
                    }
                }
                if(answers.length>=pos) notes[pos].className = 'note active';
                else {
                    document.removeEventListener('keypress', doclistener);
                    var button = document.createElement('button');
                    button.innerText = 'Continue';
                    button.addEventListener('click', lvl2.random);
                    game.appendChild(button);
                    if(correct==answers.length) hundred();
                    setProgress(2,50);
                }
            } else if(key.getModifierState("CapsLock")) {
                feedback.innerText = `Make sure Caps Lock is turned off! You may retry this one.`;
            }
        }
        document.addEventListener('keypress', doclistener);
    },
    random() {
        while (game.firstChild) {
            game.removeChild(game.lastChild);
        }
        var header = document.createElement('h1');
        header.appendChild(document.createTextNode('Level 2 - Single Notes'));
        game.appendChild(header);
        var text = document.createElement('p');
        text.appendChild(document.createTextNode('Just one note at a time. Press it\'s value. This practice is randomly generated each time and won\'t be the same next time!'));
        game.appendChild(text);
        var answers = [];
        for(var i = 0; i < 8; i++) {
            answers.push(keys[Math.floor(Math.random()*keys.length)]);
        }
        var notes = getNotes(['cleff'].concat(answers[0]));
        notes[1].className = 'note active';
        var staff = notesToElement(notes);
        staff.style.clear = 'both';
        game.appendChild(staff);
        var feedback = document.createElement('p');
        game.appendChild(feedback);
        var pos = 1;
        var correct = 0;
        doclistener = (key) => {
            if(keys.includes(key.key)) {
                if(key.key==answers[pos-1] && pos-1<answers.length) { //pos is for notes, which has a cleff at the beginning, so we subtract one to account for that.
                    feedback.innerText = affirmative[Math.floor(Math.random()*affirmative.length)];
                    correct++;
                    pos++;
                } else {
                    if(key.getModifierState("CapsLock")) {
                        feedback.innerText = `Make sure Caps Lock is turned off! You may retry this one.`;
                    } else {
                        feedback.innerText = `Whoops! The answer was ${noteToEnglish(answers[pos-1])}`;
                        incorrect[answers[pos-1]]++;
                        pos++;
                    }
                }
                if(answers.length>pos-1) {
                    notes = getNotes(['cleff'].concat(answers[pos-1]));
                    notes[1].className = 'note active';
                    var newstaff = notesToElement(notes);
                    game.replaceChild(newstaff, staff);
                    staff = newstaff;
                } else {
                    document.removeEventListener('keypress', doclistener);
                    var button = document.createElement('button');
                    button.innerText = 'Continue';
                    button.addEventListener('click', lvl2.gauntletIntro);
                    game.appendChild(button);
                    setProgress(2,75);
                    if(correct==answers.length) hundred();
                }
            } else if(key.getModifierState("CapsLock")) {
                feedback.innerText = `Make sure Caps Lock is turned off! You may retry this one.`;
            }
        }
        document.addEventListener('keypress', doclistener);
    },
    gauntletIntro() {
        while (game.firstChild) {
            game.removeChild(game.lastChild);
        }
        var header = document.createElement('h1');
        header.appendChild(document.createTextNode('Level 2 - Gauntlet of Notes'));
        game.appendChild(header);
        var text = document.createElement('p');
        text.appendChild(document.createTextNode('You made it to your second Gauntlet! Here are this gauntlet\'s rules:'));
        
        var rules = document.createElement('ol');
        var rulelist = ['The gauntlet will consist of at least 15 random notes', 'The gauntlet will end when you get 15 notes correct consecutively', 'You have unlimited time to complete the gauntlet', 'Your score is Pass/Fail.'];
        for(var i of rulelist) {
            var li = document.createElement('li');
            li.innerText = i;
            rules.appendChild(li);
        }
        text.appendChild(rules)
        text.appendChild(document.createTextNode('Don\'t worry about passing it. It is supposed to be a fun challenge. You may retry it as many times as you wish. It will begin the instant you click the button below, so be prepared!'));
        game.appendChild(text);
        var button = document.createElement('button');
        button.innerText = 'Proceed to Gauntlet';
        game.appendChild(button);
        button.addEventListener('click', lvl2.gauntlet);
    },
    gauntlet() {
        document.removeEventListener('keypress', doclistener);
        while (game.firstChild) {
            game.removeChild(game.lastChild);
        }
        var header = document.createElement('h1');
        header.appendChild(document.createTextNode('Level 2 - Gauntlet of Notes'));
        game.appendChild(header);
        var text = document.createElement('p');//for later use
        game.appendChild(text);
        var answers = [];
        for(var i = 0; i < 15; i++) {
            answers.push(keys[Math.floor(Math.random()*keys.length)]);
        }
        var notes = getNotes(['cleff'].concat(answers));
        notes[1].className = 'note active';
        var staff = notesToElement(notes);
        staff.style.clear = 'both';
        game.appendChild(staff);
        var feedback = document.createElement('p');
        game.appendChild(feedback);
        var pos = 1;
        var streak = 0;
        doclistener = (key) => {
            if(keys.includes(key.key)) {
                if(key.key==answers[pos-1] && pos-1<answers.length) { //pos is for notes, which has a cleff at the beginning, so we subtract one to account for that.
                    feedback.innerText = affirmative[Math.floor(Math.random()*affirmative.length)];
                    notes[pos].className = 'note right';
                    streak++;
                    pos++;
                } else {
                    if(key.getModifierState("CapsLock")) {
                        feedback.innerText = `Make sure Caps Lock is turned off! You may retry this one.`;
                    } else {
                        feedback.innerText = `Whoops! The answer was ${noteToEnglish(answers[pos-1])}`;
                        streak = 0;
                        notes[pos].className = 'note wrong';
                        incorrect[answers[pos-1]]++;
                        pos++;
                    }
                }
                if(streak!==15) {
                    if(answers.length<=pos-1) {
                        pos = 15;
                        answers.shift();
                        answers.push(keys[Math.floor(Math.random()*keys.length)]);
                        notes.splice(1,1);
                        var note = noteObject(answers[pos-1]);
                        notes.push(note)
                    }
                    notes[pos].className = 'note active';
                    var newstaff = notesToElement(notes);
                    newstaff.style.clear = 'both';
                    game.replaceChild(newstaff, staff);
                    staff = newstaff;
                } else {
                    document.removeEventListener('keypress', doclistener);

                    var button = document.createElement('button');
                    button.innerText = 'Continue to Level 3';
                    button.addEventListener('click', this.gauntletIntro);
                    game.appendChild(button);
                    var retry = document.createElement('button');
                    retry.innerText = 'Retry';
                    retry.addEventListener('click', this.gauntletIntro);
                    game.appendChild(retry);
                    setProgress(2,100);
                    hundred();
                    unlock('gauntlet2');
                }
            } else if(key.getModifierState("CapsLock")) {
                feedback.innerText = `Make sure Caps Lock is turned off! You may retry this one.`;
            }
        }
        document.addEventListener('keypress', doclistener);
    }
};
let operator = tutorial; //we set operator to whichever level we are doing, aka levels[level].obj
operator.init();
const levels = {
    0: {selector: 'tut', obj: tutorial},
    1: {selector: 'lvl1', obj: lvl1},
    2: {selector: 'lvl2', obj: lvl2},
};

var saveInfo = window.localStorage.getItem('info');
if(!saveInfo) {
    saveInfo = {levels: {}, unlocks: {}};
    for(var index in levels) {
        saveInfo.levels[index] = 0;
    }
    window.localStorage.setItem('info', JSON.stringify(saveInfo));
}else {
    saveInfo = JSON.parse(saveInfo);
}
for(var progress in saveInfo.levels) {
    setProgress(progress,saveInfo.levels[progress],true);
}
for(var unlocked in saveInfo.unlocks) {
    unlock(unlocked,false);
}

function setProgress(level, progress, fromZero = false) {
    var obj = document.getElementById(levels[level].selector);
    var current = saveInfo.levels[level];
    if(fromZero) current = 0;
    if(current>=progress) return;
    saveInfo.levels[level] = progress;
    window.localStorage.setItem('info', JSON.stringify(saveInfo));
    var delta = (progress - current)/100;
    var timer = setInterval(()=>{
        current+=delta;
        if(current>=progress) {
            current = progress;
            clearInterval(timer);
        }
        obj.style.background = 'linear-gradient(90deg, rgba(255,192,0,1) 0%, rgba(173,39,224,1) '+current+'%, rgba(65,10,10,0) '+current+'%)';
    },10);
}

function unlock(id, save=true) {
    document.getElementById(id).style.display = 'block';
    if(save) {
        saveInfo.unlocks[id] = true;
        window.localStorage.setItem('info', JSON.stringify(saveInfo));
    }
}

function noteObject(note) {
    var img = document.createElement('img');
    if(note=='a') note = 'la';
    if(note=='A') note = 'ha';
    if(note=='g') note = 'lg';
    if(note=='G') note = 'hg';
    if(!isNaN(note)) { //if it is a number, convert to image name
        note = scale[note];
    }
    img.src=`notes/${note}.svg`;
    return img;
}
function getNotes(array) {
    var full = []
    for(var note of array) {
        var tmp = noteObject(note);
        tmp.className = 'note';
        full.push(tmp)
    }
    return full;
}
function notesToElement(array) {
    var full = document.createElement('div');
    for(note of array) {
        full.appendChild(note);
    }
    return full;
}
function noteToEnglish(note) {
    if(note=='g') return 'Low G';
    if(note=='a') return 'Low A';
    if(note=='G') return 'High G';
    if(note=='A') return 'High A';
    return note.toUpperCase();
}
function gotoLevel(newlevel) {
    document.removeEventListener('keypress', doclistener);
    level = newlevel; //set global variable
    operator = levels[newlevel].obj;
    operator.init();
}
function hundred() {
    var hundred = document.getElementById('100');
    hundred.style.display = 'flex';
    hundred.style.opacity = 1;
    var fade = setInterval(()=>{
        var value = parseFloat(hundred.style.opacity);
        if(value<=0) {
            hundred.style.display = 'none';
            clearInterval(fade);
        } else {
            hundred.style.opacity = value-0.05;
        }
    },50);
}