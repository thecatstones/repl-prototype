require 'open3'

# Open3.popen2e("bc -q") {|i,o,t|
#   i.puts "obase=13"
#   i.puts "6 * 9"
#   p o.gets #=> "42\n"
# }

# p '2'

# Open3.popen2e("irb") {|i,o,t|
#   # i.puts "console.log('foo')"
#   i.puts '42'
#   p o.gets #=> "42\n"
#   p o.gets #=> "42\n"
#   p o.gets #=> "42\n"
#   p o.gets #=> "42\n"
#   p o.gets #=> "42\n"
#   # i.puts "exit"
#   i.puts 'puts exit'
#   p o.gets #=> "42\n"
#   p o.gets #=> "42\n"
#   p o.gets #=> "42\n"
#   p o.gets #=> "42\n"
#   i.close
# }

# Open3.popen2e("irb") {|i,o,t|
#   # i.puts "console.log('foo')"
#   i.puts '42'
#   i.puts '45'
#   i.close
#   puts o.readlines
# }

require 'open3'

stdin, stdout_stderr, wait_thread = Open3.popen2e("irb")
pid = wait_thread[:pid]

stdin.puts '42'
# p stdout_stderr.readlines           # TODO: get this line to work...?
puts 'from file start'
stdin.puts '45'
stdin.close
p wait_thread
puts 'from file middle'
puts stdout_stderr.readlines
stdout_stderr.close
puts 'from file end'
p pid
