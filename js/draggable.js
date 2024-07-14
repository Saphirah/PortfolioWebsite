
function cleanTransforms(element, transforms = ['rotateX', 'rotateY', 'translateX', 'translateY']) {
    let currentTransform = element.style.transform;
    let transformRegex = new RegExp('(' + transforms.join('|') + ')\\([^)]+\\)\\s*', 'g');
    currentTransform = currentTransform.replace(transformRegex, '');
    element.style.transform = currentTransform;
}

function getElementPosition(element) {
    const rect = element.getBoundingClientRect();
    return {
        top: rect.top + document.documentElement.scrollTop,
        left: rect.left + document.documentElement.scrollLeft
    };
}

document.querySelectorAll('[moveable]').forEach(el => {
    let startOffsetX = 0, startOffsetY = 0;
    const parent = el.parentElement;
    el.classList.add("draggable");

    function mouseMove(e) {

        // calculate new positions relative to the parent
        let parentPosition = getElementPosition(parent);
        let newLeft = e.pageX - parentPosition.left - startOffsetX;
        let newTop = e.pageY - parentPosition.top - startOffsetY;

        // ensure the element stays within the parent's boundaries
        newLeft = Math.max(0, newLeft);
        newLeft = Math.min(newLeft, parent.offsetWidth - el.offsetWidth)
        newTop = Math.max(0, newTop);
        newTop = Math.min(newTop, parent.offsetHeight - el.offsetHeight);

        // set the element's new position
        el.style.left = newLeft + "px";
        el.style.top = newTop + "px";
        updateRotation(el);
    }

    function updateRotation(el) {
        cleanTransforms(el, ["rotateZ"]);
        el.style.transform += 'rotateZ(' + (el.offsetLeft + el.getBoundingClientRect().width / 2 - el.style.left - window.innerWidth / 2) / 50 + 'deg) ';
    }

    // when the user clicks down on the element
    el.addEventListener('mousedown', function(e) {
        e.preventDefault();

        let elementPos = getElementPosition(el);
        startOffsetX = e.pageX - elementPos.left;
        startOffsetY = e.pageY - elementPos.top;

        // attach event listener for moving the mouse
        document.addEventListener('mousemove', mouseMove);

        function stopDragging() {
            document.removeEventListener('mousemove', mouseMove);
            document.removeEventListener('mouseup', stopDragging);
        }

        // stop moving when mouse button is released
        document.addEventListener('mouseup', stopDragging);
    });

    updateRotation(el);
});