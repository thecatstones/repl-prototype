require 'open3'

def read_from(label, stream)
  while line = stream.gets
    puts "#{label}: #{line}"
  end
end

Open3.popen3('irb') do |stdin, stdout, stderr, wait_thread|
  stdin.puts 'puts "wtf"'
  puts 'a'
  stdin.puts 'puts "omg"'
  t1 = Thread.new { read_from('STDOUT', stdout) }
  t2 = Thread.new { read_from('STDERR', stderr) }
  puts 'b'
  stdin.puts '3 * 4'
  puts 'c'
  stdin.puts '1 / 0'
  puts 'd'
  t3 = Thread.new { puts 'thread' }
  t3.join
  stdin.puts '2 - 5'
  puts 'e'
  t4 = Thread.new { puts 'threadzzzzz' }
  stdin.puts '"i have no idea"'
  puts 'f'
  stdin.puts 'puts "threads are crazy"'
  t4.join
  stdin.puts '42'
  stdin.close
  t1.join
  t2.join
  puts 'g'
end
