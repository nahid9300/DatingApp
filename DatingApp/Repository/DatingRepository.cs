using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.Data;
using DatingApp.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Repository
{
    public class DatingRepository : IDatingRepository
    {
        private readonly ApplicationContext _applicationContext;
        public DatingRepository(ApplicationContext applicationContext)
        {
            _applicationContext = applicationContext;
        }



        public void Add<T>(T entity) where T : class
        {
            _applicationContext.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _applicationContext.Remove(entity);
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _applicationContext.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _applicationContext.Users.Include(p => p.Photos).ToListAsync();
            return users;
        }

        public async Task<bool> SaveAll()
        {
            return await _applicationContext.SaveChangesAsync() > 0;
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _applicationContext.Photos.FirstOrDefaultAsync(p => p.Id == id);
            return photo;
        }
    }
}
