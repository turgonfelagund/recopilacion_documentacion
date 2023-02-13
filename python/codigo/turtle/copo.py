import turtle
t = turtle.Turtle()
wn = turtle.Screen()
wn.bgcolor('black')
t.color("white")
t.speed(0)

def koch(cursor, iterations, length, shortening_factor, angle):
    if iterations == 0:
        cursor.forward(length)
    else:
        iterations = iterations - 1
        length = length / shortening_factor
    
        koch(cursor, iterations, length, shortening_factor, angle)
        cursor.left(angle)
        koch(cursor, iterations, length, shortening_factor, angle)
        cursor.right(angle * 2)
        koch(cursor, iterations, length, shortening_factor, angle)
        cursor.left(angle)
        koch(cursor, iterations, length, shortening_factor, angle)
        for i in range(3):
            koch(t, 4, 200, 3, 60)
            t.right(120)
    
turtle.mainloop()