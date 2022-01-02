var imgName = "circle.png";
var img;
var toDraw;
var circleArr = [];
var circleDropsArr = [];
var numCircles = 100;
var frameArr = []; 
var frameArr_2 = [];


function preload() {
    img = loadImage(imgName);
    table = loadTable("ethereal.csv", "csv", "header");
}

function setup() {
    createCanvas(500, 500);
    img.loadPixels();
    background(0,0,0,255);
    frameRate(24);
    toDraw = new Array(img.width/5);
    for (var i=0; i<img.width; i+=5) {
        toDraw[i] = new Array(img.height/5);
    }


  print(table.getRowCount() + " total rows in table");
  print(table.getColumnCount() + " total columns in table");

  for (var r = 0; r < table.getRowCount(); r++)
    for (var c = 2; c < table.getColumnCount(); c+=3) {
      x = table.getNum(r, c-2);
      y = table.getNum(r, c-1);
      value = table.getNum(r, c);
      toDraw[x][y] = value;

        if (value==5) {
                thisFrame= new Frame(x, y);
                frameArr.push(thisFrame);
                //console.log(value);
            } 
        if (value==4) {
                extraFrame= new Frame(x, y);
                frameArr_2.push(extraFrame);
                //console.log(value);
            } 

    }


    console.log("Done");

    // oldx = width/2;
    // oldy = height/2;
    weight = 1;

    // for (var i = 0; i<numCircles; i++) {

    // }
    // console.log(circleArr.length);

    for (var i = 0; i <frameArr.length; i++){
        thisCirc = new Circle(frameArr[i].x, frameArr[i].y);
        circleArr.push(thisCirc);
    }

    for (var i = 0; i<numCircles; i++) {
        thisCircDrops = new CircleDrops();
        circleDropsArr.push(thisCircDrops);
    }




}


function draw() {
    background(0,0,0,40);
    var lastx = random(width);
    var lasty = random(height); 
    for (var i = 0; i <frameArr.length; i++){
        stroke(200, 50, 100, 50);
        strokeWeight(0.3);
        line(frameArr[i].x, frameArr[i].y, lastx, lasty);
        strokeWeight(2);
        stroke(200, 50, 100, 100);
        point(frameArr[i].x+ random(-500, 500), frameArr[i].y+ random(-500, 500));
        lastx = frameArr[i].x + random(-500, 500);
        lasty = frameArr[i].y + random(-500, 500);

    }

    for (var i = 0; i<circleArr.length; i++) {
        thisCirc = circleArr[i];
        thisCirc.updateMe(); 
    }

    for (var i = 0; i<circleDropsArr.length; i++) {
        thisCircDrops = circleDropsArr[i];
        thisCircDrops.updateMe(); 
    }



    // // ~~~~~~~~~~~~~~~~~~~~~~~
    for (var x=0; x<img.width; x+=5) {
        for (var y=0; y<img.height; y+=5) {
            if (toDraw[x][y] == 4){
                strokeWeight(0.5);
                stroke(random(100, 200), random(100, 200), random(100, 200), random(50));
                noFill();
                beginShape();
                curveVertex(x, y);
                curveVertex(x+random(-weight, weight), y+random(-weight, weight));
                curveVertex(x+random(-weight-10, weight+10), y+random(-weight-10, weight+10));
                curveVertex(x+random(-weight-20, weight+20), y+random(-weight-20, weight+20));
                curveVertex(x+random(-weight+20, weight-20), y+random(-weight+20, weight-20));
                curveVertex(x+random(-weight+10, weight-10), y+random(-weight+10, weight-10));
                curveVertex(x+random(-weight, weight), y+random(-weight, weight));
                endShape();
                stroke(100, 100);
                strokeWeight(1);
                point(x, y);
            }
        }
    }
    if (weight <100){
    weight++;
    }
    // // ~~~~~~~~~~~~~~~~~~~~~~~

    for (var i = 0; i <frameArr.length; i+=1){
        stroke(random(100, 200), random(100, 200), random(100, 200), random(200, 255));
        strokeWeight(0.5);
        point(frameArr[i].x+random(-10, 10), frameArr[i].y+random(-10, 10));
        point(frameArr[i].x+random(-3, 3), frameArr[i].y+random(-3, 3));
    }

    for (var i = 0; i <frameArr_2.length; i+=1){
        stroke(random(100, 200), random(100, 200), random(100, 200), random(200, 255));
        strokeWeight(0.5);
        point(frameArr_2[i].x+random(-10, 10), frameArr_2[i].y+random(-10, 10));
        point(frameArr_2[i].x+random(-3, 3), frameArr_2[i].y+random(-3, 3));
    }




}

function Circle(x, y) {
    this.x = x;
    this.y = y;
    this.dir = 1;
    this.radius = random(100);
    this.alph = random(10);
    this.xmove = random(10);
    this.ymove = random(10);
    noStroke();
    fill(random(100, 200), random(100, 200), random(100, 200), random(50));
    ellipse(this.x, this.y, this.radius, this.radius);

    this.updateMe = function() {
        this.x += this.xmove*this.dir+random(-100,100);
        this.y += this.ymove*this.dir+random(-100,100);

        for (var i = 0; i <frameArr.length; i++) {
            otherFrame = frameArr[i];
            var dis = dist(this.x, this.y, otherFrame.x, otherFrame.y);

            if (dis <10) {
                //console.log("Close");
                this.dir = -this.dir*random(1);
                extraCirc = new Circle(this.x, this.y);
                extraCirc.updateMe(); 
            }
            else
            {
                // this.x += this.xmove;
                // this.y += this.ymove;
                //this.dir = -this.dir;
            }
            // if ((this.x == frameArr[i].x) && (this.y == frameArr[i].y)) {
            //     this.x -= this.xmove;
            //     this.y -= this.ymove;

            // } 
            //else {

            //     console.log("No hit");
            //     ellipse(this.x, this.y, this.radius, this.radius);
            // }
        }

        // fill(random(100, 255), 0, 0, 20+random(this.dir));
        // ellipse(this.x, this.y, this.radius+random(this.dir), this.radius+random(this.dir));
    }
}

function Frame(x, y) {
    this.x = x;
    this.y = y;
    noStroke();
    fill(100, 0);
    ellipse(this.x, this.y, 5, 5);
}

function CircleDrops() {
    this.x = random(width);
    this.y = random(height);
    this.dir = 1;
    this.radius = random(5);
    this.alph = random(10);
    this.xmove = random(10);
    this.ymove = random(10);
    noStroke();
    fill(random(200, 255), random(200, 255), random(200, 255), random(10));
    ellipse(this.x, this.y, this.radius, this.radius);

    this.updateMe = function() {
        this.x += this.xmove*this.dir;
        this.y += this.ymove*this.dir;
        for (var i = 0; i <frameArr.length; i++) {
            otherFrame = frameArr[i];
            var dis = dist(this.x, this.y, otherFrame.x, otherFrame.y);

            if (dis <5) {
                //console.log("Close");
                this.dir = -this.dir*random(1);
            }
            else
            {
                // this.x += this.xmove;
                // this.y += this.ymove;
                //this.dir = -this.dir;
            }
            // if ((this.x == frameArr[i].x) && (this.y == frameArr[i].y)) {
            //     this.x -= this.xmove;
            //     this.y -= this.ymove;

            // } 
            //else {

            //     console.log("No hit");
            //     ellipse(this.x, this.y, this.radius, this.radius);
            // }
        }

        var dis1 = dist(this.x, this.y, width, height)
        if (dis1 <10) {
            //console.log("Close");
            this.dir = -this.dir*0.5;
        }
        else
        {
            // this.x += this.xmove;
            // this.y += this.ymove;
            // this.dir = -this.dir;
        }

        var dis2 = dist(this.x, this.y, 0, height)
        if (dis2 <10) {
            //console.log("Close");
            this.dir = -this.dir*0.5;
        }
        else
        {
            // this.x += this.xmove;
            // this.y += this.ymove;
            // this.dir = -this.dir;
        }

        var dis3 = dist(this.x, this.y, width, 0)
        if (dis3 <10) {
            //console.log("Close");
            this.dir = -this.dir*0.5;
        }
        else
        {
            // this.x += this.xmove;
            // this.y += this.ymove;
            // this.dir = -this.dir;
        }

        var dis4 = dist(this.x, this.y, 0, 0)
        if (dis4 <10) {
            //console.log("Close");
            this.dir = -this.dir*0.5;
        }
        else
        {
            // this.x += this.xmove;
            // this.y += this.ymove;
            // this.dir = -this.dir;
        }
        noStroke();
        fill(random(200, 255), random(200, 255), random(200, 255), random(10));
        ellipse(this.x, this.y, this.radius+random(this.dir), this.radius+random(this.dir));
    }
}
