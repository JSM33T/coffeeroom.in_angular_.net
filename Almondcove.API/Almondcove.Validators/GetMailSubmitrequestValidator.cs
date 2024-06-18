using Almondcove.Entities.Dedicated;
using FluentValidation;
using FluentValidation.Validators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
