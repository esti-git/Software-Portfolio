using Dto;

namespace IDal

{
    public interface DalInterface
    {


        Task<DateTime?> GetCustomerDateByEmail(string email);

        Task<DtoCustomer> GetCustomerByEmail(string enail);

        Task AddCustomer(DtoCustomer customer);

        Task<List<DtoEvent>> GetAllEvents();

        Task<List<DtoEvent>> GetEventByCategoryId(int? categoryId);

        Task<List<DtoCategory>> GetAllCategories();

        Task AddPurchase(DtoPurchase purchase);

        Task AddPurchaseDetail(DtoPurchaseDetails purchaseDetails);


    }
}
