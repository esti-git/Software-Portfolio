using Dto;
using IDal;
using System.Security.Cryptography;
using System.Text;

namespace Bll
{
    public class BllClass : IBll.BllInterface
    {

        IDal.DalInterface e;
        public BllClass(IDal.DalInterface e)
        {
            this.e = e;
        }

        public async Task<List<DtoEvent>> GetAllEvents()
        {
            return await this.e.GetAllEvents();
        }

        public async Task<List<DtoEvent>> GetEventByCategoryId(int? categoryId)
        {
            return await this.e.GetEventByCategoryId(categoryId);
        }

        public async Task<List<DtoCategory>> GetAllCategories()
        {
            return await this.e.GetAllCategories();
        }

        public async Task AddCustomer(DtoCustomer customer)
        {
            if (string.IsNullOrWhiteSpace(customer.Username))
                throw new Exception("Username is required");

            var exists = await e.GetCustomerByEmail(customer.Email);

            if (exists != null)
                throw new Exception("EXISTS");

            customer.CreatedAt = DateTime.Now;

            await e.AddCustomer(customer);
        }

        public async Task<DtoCustomer> GetCustomerByEmail(string email)
        {
            return await this.e.GetCustomerByEmail(email);
        }

        public async Task<DateTime?> GetCustomerDateByEmail(string email)
        {
            return await e.GetCustomerDateByEmail(email);

        }

        public async Task AddPurchase(DtoPurchase purchase)
        {
            await e.AddPurchase(purchase);
        }

        public async Task AddPurchaseDetail(DtoPurchaseDetails purchaseDetails)
        {
            await e.AddPurchaseDetail(purchaseDetails);
        }

    }
}