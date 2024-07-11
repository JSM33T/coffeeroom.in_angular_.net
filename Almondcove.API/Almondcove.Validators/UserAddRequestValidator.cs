using Almondcove.Entities.Dedicated;
using FluentValidation;

namespace Almondcove.Validators
{
    public class UserAddRequestValidator : AbstractValidator<UserAddRequest>
    {
        public UserAddRequestValidator()
        {
            RuleFor(x => x.FirstName)
                .NotEmpty().WithMessage("Firstname is required")
                .MaximumLength(128).WithMessage("Name cannot exceed 128 characters");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required")
                .EmailAddress().WithMessage("Invalid email format")
                .MaximumLength(128).WithMessage("Email cannot exceed 128 characters");

            RuleFor(x => x.Username)
                .NotEmpty().WithMessage("Username is required")
                .MaximumLength(128).WithMessage("Topic cannot exceed 128 characters");

            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Password is required")
                .MaximumLength(128).WithMessage("Password cannot exceed 128 characters")
                .MinimumLength(6).WithMessage("Password must be at least 6 characters long")
                .Must((user, password) => password != user.FirstName).WithMessage("Password cannot be the same as the first name")
                .Must((user, password) => password != user.Username).WithMessage("Password cannot be the same as the username");

            RuleFor(x => x.PasswordConfirm)
                .Equal(x => x.Password).WithMessage("Passwords do not match");

        }
    }
}
