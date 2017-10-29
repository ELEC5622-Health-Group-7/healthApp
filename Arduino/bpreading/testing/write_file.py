
# function_type: 1 as pre-exercise, 2 as post-exercise, 3 as daily tracking
def write_file(file_path, user_id, function_type, data_to_write, date):
    with file(file_path, 'w') as f:
        if (function_type == '1') or (function_type == '2'):
            f.write(str(user_id)+ ' ' + str(function_type)+ ' ' + str(data_to_write) )
        else:
            f.write(str(user_id)+ ' ' + str(date) + ' '+ str(data_to_write) )
