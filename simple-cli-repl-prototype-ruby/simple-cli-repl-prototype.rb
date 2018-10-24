#!/usr/bin/env ruby
# Simple CLI REPL Prototype

def new_binding
  binding
end

b = new_binding

loop do
  print '>> '
  input = gets.chomp
  break if input == 'exit'
  begin
    return_val = b.eval(input)
  rescue Exception => error
    return_val = error
  ensure
    p return_val
  end
end
