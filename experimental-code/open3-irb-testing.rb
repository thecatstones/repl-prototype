# pid = spawn(RbConfig.ruby, "-eputs'Hello, world!'")
# Process.wait pid
#
#

require 'open3'

# exit_status = nil
# pid = nil
# out = nil
# Open3.popen3('pwd') do |stdin, stdout, stderr, wait_thr|
#   p [stdin, stdout, stderr, wait_thr]
#   puts stdout
#   pid = wait_thr.pid
#   stdin.write 'puts 42'
#   # out = stdout.read
#   stdin.close
#   stdout.close
#   stderr.close
#   exit_status = wait_thr.value
# end

# p exit_status
# p pid

# exit_status = 'before'

# Open3.popen3('irb') do |stdin, stdout, stderr, wait_thr|
#   p [stdin, stdout, stderr, wait_thr]
#   p stdout.read

#   exit_status = wait_thr.value
# end

# p exit_status


stdin, stdout, stderr, wait_thr = Open3.popen3('irb')
pid = wait_thr[:pid]  # pid of the started process

p stdout.read

# stdin, stdout and stderr should be closed explicitly in this form:
stdin.close
stdout.close
stderr.close
exit_status = wait_thr.value  # Process::Status object returned.

p pid
p exit_status
