from abc import ABC ,abstractmethod

class Employe(ABC):
	def __init__(self,empid,name,salary):
		self.empid=empid
		self.name=name
		self.__salary=salary
	@property
	def salary(self):
		return self.__salary

	@salary.setter
	def salary(self, salary):
		if salary <= 0:
			raise ValueError("Salary cannot be zero or negative")
		self.__salary = salary	
  
	def display(self):	
		print("Employee ID:", self.empid)
		print("Employee Name:", self.name)
		print("Employee Salary:", self.__salary)
  
	@abstractmethod
	def calculate_salary(self):
		...

class ftemploye(Employe):
	def calculate_salary(self):
		return self.salary


class ptemploye(Employe):
    def __init__(self, empid, name, salary,hours):
     super().__init__(empid, name, salary)
     self.hours = hours

    def calculate_salary(self):
     return self.salary * self.hours

abe = ftemploye("0101","abeba kebda", 5000)

alm = ftemploye("0102","alemayehu kebede", 6000)

#alm.display()

ale = ptemploye("0103","alemayehu kebede", 6000, 10)

print("Part-time Employee Salary:", ale.calculate_salary())