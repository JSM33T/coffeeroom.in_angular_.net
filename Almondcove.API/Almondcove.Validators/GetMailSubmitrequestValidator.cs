using Almondcove.Entities.Dedicated;
using FluentValidation;

namespace Almondcove.Validators
{
    public class GetMailSubmitrequestValidator : AbstractValidator<AddEmailRequest>
    {
        public GetMailSubmitrequestValidator()
        {
            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required")
                .MinimumLength(3).WithMessage("Invalid email");
        }
    }
}
