using Almondcove.Entities.Dedicated;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Almondcove.Validators
{
    public class UserVerifyRequestValidator : AbstractValidator<UserVerifyRequest>
    {
        public UserVerifyRequestValidator()
        {
            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required")
                .EmailAddress().WithMessage("Invalid email format")
                .MaximumLength(128).WithMessage("Email cannot exceed 128 characters");

            RuleFor(x => x.OTP)
                 .NotEmpty().WithMessage("OTP is required")
                 .Must(otp => otp != null && otp.Length == 4 && int.TryParse(otp.ToString(), out _))
                 .WithMessage("OTP must be a 4-digit number");
        }
    }
}
