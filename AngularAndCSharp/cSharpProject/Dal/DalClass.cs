using Dal.converters;
using Dal.Models;
using Dto;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Dal
{
    public class DalClass : IDal.DalInterface
    {
        private readonly EventStoreContext db;

        public DalClass(EventStoreContext db)
        {
            this.db = db;
        }

        public async Task<List<DtoEvent>> GetAllEvents()
        {
            var tlist = await db.Events.ToListAsync();
            return EventConverter.ToDtoList(tlist);
        }

        public async Task<List<DtoEvent>> GetEventByCategoryId(int? categoryId)
        {
            var query = db.Events
                          .Where(p => categoryId == null || p.CategoryId == categoryId);

            var dalEntities = await query.ToListAsync();

            var dtoEvents = dalEntities
                .Select(p => EventConverter.ToDto(p))
                .ToList();

            return dtoEvents;
        }

        public async Task<List<DtoCategory>> GetAllCategories()
        {
            var tlist = await db.Categories.ToListAsync();
            return CategoryConverter.ToDtoList(tlist);
        }

        public async Task AddCustomer(DtoCustomer customer)
        {
            var entity = CustomerConverter.ToEntity(customer);

            await db.Customers.AddAsync(entity);
            await db.SaveChangesAsync();
        }

        public async Task<DtoCustomer> GetCustomerByEmail(string email)
        {
            var dalEntity = await db.Customers
                .FirstOrDefaultAsync(c => c.Email == email);

            if (dalEntity == null)
                return null;

            return CustomerConverter.ToDto(dalEntity);
        }

        public async Task<DateTime?> GetCustomerDateByEmail(string email)
        {
            var createDate = await db.Customers
                .Where(c => c.Email == email)
                .Select(c => c.CreatedAt)
                .FirstOrDefaultAsync();

            return createDate;
        }

        public async Task AddPurchase(DtoPurchase purchase)
        {
            var entity = PurchaseConverter.ToEntity(purchase);

            await db.Purchases.AddAsync(entity);
            await db.SaveChangesAsync();
        }

        public async Task AddPurchaseDetail(DtoPurchaseDetails purchaseDetails)
        {
            var entity = PurchaseDetailConverter.ToEntity(purchaseDetails);

            await db.PurchaseDetails.AddAsync(entity);
            await db.SaveChangesAsync();
        }
    }
}