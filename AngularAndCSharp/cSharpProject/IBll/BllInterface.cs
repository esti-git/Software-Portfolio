using Dto;

namespace IBll
{
    public interface BllInterface
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
