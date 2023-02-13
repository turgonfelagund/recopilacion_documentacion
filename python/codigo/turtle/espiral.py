import turtle

turtle.bgcolor("black")

colours = ['red', 'green', 'blue', 'orange', 'pink', 'purple']
turtle.speed(10)
for x in range(360):
  turtle.pencolor(colours[x % 6])
  turtle.width(x / 100 + 1)
  turtle.forward(x)
  turtle.left(59)