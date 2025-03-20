-- Create a table to track rent history changes
CREATE TABLE IF NOT EXISTS rent_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  child_property_id INT NOT NULL,
  previous_amount DECIMAL(10, 2),
  new_amount DECIMAL(10, 2) NOT NULL,
  change_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  changed_by VARCHAR(100),
  FOREIGN KEY (child_property_id) REFERENCES child_properties(id) ON DELETE CASCADE
);

-- Create a table to track deposit history changes
CREATE TABLE IF NOT EXISTS deposit_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  child_property_id INT NOT NULL,
  previous_amount DECIMAL(10, 2),
  new_amount DECIMAL(10, 2) NOT NULL,
  change_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  changed_by VARCHAR(100),
  FOREIGN KEY (child_property_id) REFERENCES child_properties(id) ON DELETE CASCADE
);

-- Create triggers to automatically log rent changes
DELIMITER //
CREATE TRIGGER after_rent_update
AFTER UPDATE ON child_properties
FOR EACH ROW
BEGIN
  IF OLD.rent <> NEW.rent THEN
    INSERT INTO rent_history (child_property_id, previous_amount, new_amount)
    VALUES (NEW.id, OLD.rent, NEW.rent);
  END IF;
END//
DELIMITER ;

-- Create triggers to automatically log deposit changes
DELIMITER //
CREATE TRIGGER after_deposit_update
AFTER UPDATE ON child_properties
FOR EACH ROW
BEGIN
  IF OLD.deposit <> NEW.deposit THEN
    INSERT INTO deposit_history (child_property_id, previous_amount, new_amount)
    VALUES (NEW.id, OLD.deposit, NEW.deposit);
  END IF;
END//
DELIMITER ; 