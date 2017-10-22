import time

data_ex_pre = "86 122 79 \n"
user_id = "12345789"
f = file("testing.txt", "w")
f.write(user_id + " 1 " + data_ex_pre)
f.close()

f = 