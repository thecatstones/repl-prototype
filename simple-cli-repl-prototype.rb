# input = ''

def new_binding
  binding
end

b = new_binding

loop do
  print '>> '
  input = gets.chomp
  break if input == 'exit'
  return_val = b.eval(input)
  p return_val
end
