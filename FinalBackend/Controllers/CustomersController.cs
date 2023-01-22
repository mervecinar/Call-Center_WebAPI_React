using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FinalBackEnd.Models;
using System.Reflection;

namespace FinalBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : Controller
    {
        private readonly BLM19417EContext _context;

        public CustomersController(BLM19417EContext context)
        {
            _context = context;
        }


        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetEmployees()
        {
            return await _context.Customers.ToListAsync();
        }

        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetEmployee(int id)
        {
            var employee = await _context.Customers.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        // PUT: api/Customers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, Customer employee)
        {
            if (id != employee.CustomerId)
            {
                return BadRequest();
            }

            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        // POST: api/Customers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<IActionResult> PostEmployee(Customer student)
        {

            _context.Customers.Add(new Customer()
            {
                CustomerId = student.CustomerId,
                FirstName = student.FirstName,
                LastName = student.LastName,
                country = student.country,
                phone = student.phone,
                age = student.age,
                point = student.point,
                CosRepresantativeId = student.CosRepresantativeId
            });
            _context.SaveChanges();
            return Ok();
        }


        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Customers.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Customers.Remove(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployeeExists(int id)
        {
            return _context.Customers.Any(e => e.CustomerId == id);
        }
    }
}
