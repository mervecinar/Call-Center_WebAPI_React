namespace FinalBackEnd.Models
{
    public partial class RequestComplaint
    {

        public int RequestComplaintId { get; set; }
        public string? Type { get; set; }
        public string? Text { get; set; }
        public int? CustomerId { get; set; }
        public int? cosid { get; set; }

        public virtual Customer? Customer { get; set; }
        
    }
}
