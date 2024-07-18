declare var bootstrap: any;

export function ShowModal(id: string) {
    const modalElement = document.getElementById(id);
    const myModal = new bootstrap.Modal(modalElement);
    myModal.show();
}

export function HideModal(id: string) {
    const modalElement = document.getElementById(id);
    const myModal = new bootstrap.Modal(modalElement);
    myModal.hide();
}
