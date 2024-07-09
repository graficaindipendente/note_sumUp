javascript:(function() {
    var orderNoteDiv = document.querySelector('p.order_note');
    var orderNoteContent = orderNoteDiv ? orderNoteDiv.textContent.trim() : "nessuna nota principale";
    var noteDivs = document.querySelectorAll('div.note_content');
    var uniqueContents = new Set();

    noteDivs.forEach(function(div) {
        var text = div.textContent.trim();
        if (!text.toLowerCase().includes("parziale") &&
            !text.toLowerCase().includes("check-ok") &&
                        !text.toLowerCase().includes("pronto-per-produzione") &&
                        !text.startsWith("Livelli del magazzino") &&
                        !text.startsWith("La commissione") &&
            !text.startsWith("Lo stato") &&
            !text.startsWith("Stato") &&
            !text.startsWith("E-mail") &&
            !text.startsWith("Dati") &&
            !text.startsWith("Transazione") &&
            !text.startsWith("Stripe") &&
            !text.startsWith("Notifica") &&
            !text.startsWith("In attesa di pagamento") &&
            !text.startsWith("[GLS") &&
            !text.startsWith("PayPal")) {
            uniqueContents.add(text);
        }
    });

    var internalNotesArray = Array.from(uniqueContents);
    var internalNotes = internalNotesArray.map((note, index) => `<strong>Nota ${internalNotesArray.length - index}:</strong> ${note}`).join('<br><br>');

    var dialogHtml = `
        <div id="customAlertOverlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; z-index: 10000;">
            <div id="customAlertContent" style="background: #FDFDC9; padding: 20px; width: 80%; max-width: 800px; height: 800px; overflow-y: auto; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); position: relative;">
                <div style="position: absolute; top: 10px; right: 10px; font-size: 9px; color: #888;">
<b>v1.12 BETA</b> <i>2024© AleP</i></div>
                <h3>${orderNoteContent}</h3>
                <hr>
                <h3>Note interne:</h3>
                <p>${internalNotes}</p>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', dialogHtml);

    function closeDialog() {
        var overlay = document.getElementById('customAlertOverlay');
        if (overlay) {
            overlay.remove();
        }
    }

    document.getElementById('customAlertOverlay').addEventListener('click', function(event) {
        if (event.target.id === 'customAlertOverlay') {
            closeDialog();
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeDialog();
        }
    });
})();
