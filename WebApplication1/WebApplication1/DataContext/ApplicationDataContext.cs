using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1
{
    /// <summary>
    /// Data context for the application
    /// </summary>
    public class ApplicationDataContext : DbContext
    {
        #region Db Sets
        
        public DbSet<Campaign> Campaigns { get; set; }
        
        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Turn keywords which is a list of strings into a single comma-separated string
            // Breaks if a single keyword contains a comma, use JSON converter in such case
            modelBuilder.Entity<Campaign>()
                .Property(x => x.Keywords)
                .HasConversion(
                    v => string.Join(',', v),
                    v => v.Split(',', StringSplitOptions.RemoveEmptyEntries));
        }

        public ApplicationDataContext(DbContextOptions<ApplicationDataContext> options) : base(options)
        {
        }
    }
}
