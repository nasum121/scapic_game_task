function scriptfile()
{
var canvas=document.getElementById("mycanvas");
    var ctx=canvas.getContext("2d");
    var x=canvas.width/2;
    var y=canvas.height-30;
    var dx=2;
    var dy=-2;
    var ballRadius=8;
    var paddleHeight = 15;
    var paddleWidth = 125;
    var paddleX = (canvas.width-paddleWidth)/2;
    var rightPressed = false;
    var leftPressed = false; 
    var score=0;
    var lives=3;
    var brickRowCount = 5;
    var brickColumnCount = 17;
    var brickWidth = 50;
    var brickHeight = 13;
    var brickPadding = 5;
    var brickOffsetTop = 30;
    var brickOffsetLeft = 30;
    var bricks = [];
     for(c=0; c<brickColumnCount; c++) 
     {
      bricks[c] = [];
        for(r=0; r<brickRowCount; r++) 
       {
        bricks[c][r] = { x: 0, y: 0, status:1 };
       }
     }

    document.addEventListener("keydown", keyDownHandler,false);
    document.addEventListener("keyup", keyUpHandler,false);
    function keyDownHandler(e) 
  {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
  }

  document.addEventListener("keydown", keyDownHandler,false);

    function keyUpHandler(e) 
  {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
  }
   document.addEventListener("keyup", keyUpHandler,false);

  if(rightPressed && paddleX < canvas.width-paddleWidth) 
 {
    paddleX += 7;
 }
else if(leftPressed && paddleX > 0) 
 {
    paddleX -= 7;
 }

 function collisionDetection() 
  {
     for(c=0; c<brickColumnCount; c++) 
     {
        for(r=0; r<brickRowCount; r++) 
        {
            var b = bricks[c][r];
             if(b.status == 1) 
          {
            if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight)
            {
                dy = -dy;
                b.status = 0;
                score++;
                if(score == brickRowCount*brickColumnCount) 
                {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
	            }            
            }
          } 
        }
     }
  }

   function mouseMoveHandler(e) 
    {
     var relativeX = e.clientX - canvas.offsetLeft;
     if(relativeX > 0 && relativeX < canvas.width) 
      {
        paddleX = relativeX - paddleWidth/2;
      }
    }  

    document.addEventListener("mousemove", mouseMoveHandler, false);

  function drawScore()
  {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FFFF00";
    ctx.fillText("Score: "+score, 8, 20);
  } 

  function drawLives() 
  {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FFFF00";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
  } 
  

    function drawBall()
	{
		ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
        
    }

    function drawPaddle() 
    {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#FFFF00";
    ctx.fill();
    ctx.closePath();
    }

    function drawBricks() 
    {
     for(c=0; c<brickColumnCount; c++) 
     {
        for(r=0; r<brickRowCount; r++) 
        {
        	 if(bricks[c][r].status == 1) 
         {
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.closePath();
           } 
        }
      }
    }

    function draw()
    {
    	ctx.clearRect(0,0,canvas.width,canvas.height);

    	drawBall();
        x += dx;
        y += dy;

        if(x + dx > canvas.width-ballRadius || x + dx < 0) 
        {
         dx = -dx;    
        }

         if(y + dy < ballRadius) 
         {
         dy = -dy;
         }
         else if(y + dy > canvas.height-ballRadius) 
         {
          if(x > paddleX && x < paddleX + paddleWidth)
         	{
                 dy = -dy;
            }
          else
          {
           lives--;
           if(!lives) 
           {
             alert("TRY AGAIN");
             document.location.reload();
           }
           else
           {
              x = canvas.width/2;
              y = canvas.height-30;
              dx = 2;
              dy = -2;
              paddleX = (canvas.width-paddleWidth)/2;
            }
          }
        }

         drawScore();
         drawLives();
         drawPaddle();
         if(rightPressed && paddleX < canvas.width-paddleWidth) 
        {
           paddleX += 7;
        }
         else if(leftPressed && paddleX > 0) 
        {
            paddleX -= 7;
        }

        collisionDetection();
       
        drawBricks();

    }
   
 setInterval(draw,5);
}
