CREATE TABLE ServerHealths (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cpuUsage FLOAT NOT NULL,
  memoryUsage FLOAT NOT NULL,
  romUsage FLOAT NOT NULL,
  bandwidth VARCHAR(255) NOT NULL
);