/* document.onload = () => {
    const productEditForm = document.getElementById('producteditform');
    handleEvent = (event) => {
        event.preventDefault();
        console.log('FOrm Prevented submit');
    }
    productEditForm.addEventListener('submit', handleEvent);
} */

deleteProduct = btn => {
    const productId = btn.parentNode.querySelector('[name=productId]').value;
    const csrf = btn.parentNode.querySelector('[name=_csrf]').value;

    const productElement = btn.closest("article");
    // console.log(productElement);

    fetch('/admin/product/' + productId, {
        method: 'DELETE',
        headers: {
            'csrf-token': csrf
        }
    })
        .then(result => {
            return result.json();
        })
        .then(data => {
            console.log(data);
            productElement.parentNode.removeChild(productElement);
        })
        .catch(error => {
            console.log(error);
        });
}