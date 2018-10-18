require 'open3'

# i, o, e, t = Open3.popen3("node")
# p [i, o, e, t] 
# i.puts "const a = 'hello'"
# i.puts "console.log(5 * 5)"
# i.puts "console.log(a)"
# i.close

# # i.open
# # i.puts 'asdas'
# p o.readlines
# o.close
# e.close
# exit_status = t.value
# p exit_status


Open3.popen3("sleep 2; ls") do |i, o, e, t|

  p [i,o,e,t]
  
  while line = o.gets do 
    puts(line) 
  end
end
