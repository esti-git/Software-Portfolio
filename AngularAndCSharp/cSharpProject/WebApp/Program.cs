using Bll; // ייבוא למימוש BLL
using Dal; // ייבוא למימוש DAL
using Dal.Models; // ייבוא נחוץ ל-EventStoreContext
using IBll; // ייבוא לממשק BLL
using IDal; // ייבוא לממשק DAL
using Microsoft.AspNetCore.DataProtection.Repositories; // וודאי שזה נחוץ
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// הגדרת CORS - מומלץ להשתמש ב-URL ספציפי במקום AllowAll
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
            builder =>
            {
                builder.WithOrigins("http://localhost:4200")
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            });
});

// הגדרות Controllers
builder.Services.AddControllers();

// הגדרות Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// הזרקות תלויות (Dependency Injection)
builder.Services.AddScoped<IDal.DalInterface, Dal.DalClass>();
builder.Services.AddScoped<IBll.BllInterface, Bll.BllClass>();

// הגדרת מסד נתונים
builder.Services.AddDbContext<EventStoreContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("EstiConnection")));


var app = builder.Build();
app.UseStaticFiles(); // מומלץ להשאיר את זה כאן אם יש לך קבצים סטטיים

// הגדרות סביבת פיתוח (Swagger)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAngularApp");

app.UseAuthorization();

app.MapControllers();

app.Run();