using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FinalBackEnd.Models;

namespace FinalBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : Controller
    {
        private readonly BLM19417EContext _context;

        public DepartmentsController(BLM19417EContext context)
        {
            _context = context;
        }


        // GET: api/Departments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Department>>> GetEmployees()
        {
            return await _context.Departments.ToListAsync();
        }

        // GET: api/Departments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Department>> GetEmployee(int id)
        {
            var employee = await _context.Departments.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        // PUT: api/Departments/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDepartment(int id, Department department)
        {
            if (id != department.DepartmentId)
            {
                return BadRequest();
            }

            _context.Entry(department).State = EntityState.Modified;

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



        // POST: api/Departments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]

        public async Task<ActionResult<Department>> PostEmployee(Department student)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");


            _context.Departments.Add(new Department()
            {
                DepartmentId = student.DepartmentId,
                DepartmentName = student.DepartmentName
            });

            _context.SaveChanges();
            return Ok();
        }



        // DELETE: api/Departments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Departments.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Departments.Remove(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployeeExists(int id)
        {
            return _context.Departments.Any(e => e.DepartmentId == id);
        }
    }
}
