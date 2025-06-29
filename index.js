let currentInput = '0';
    let previousInput = '';
    let operation = null;
    let waitingForNewInput = false;

    const currentDisplay = document.getElementById('current');
    const previousDisplay = document.getElementById('previous');
    const display = document.getElementById('display');

    function updateDisplay() {
        currentDisplay.textContent = formatNumber(currentInput);
        if (operation && previousInput) {
            const operatorSymbol = {
                '+': '+',
                '-': '−',
                '*': '×',
                '/': '÷'
            }[operation] || operation;
            previousDisplay.textContent = `${formatNumber(previousInput)} ${operatorSymbol}`;
        } else {
            previousDisplay.textContent = '';
        }
    }

    function formatNumber(num) {
        if (num.length > 12) {
            return parseFloat(num).toExponential(6);
        }
        return num;
    }

    function appendNumber(number) {
        if (waitingForNewInput) {
            currentInput = number;
            waitingForNewInput = false;
        } else {
            currentInput = currentInput === '0' ? number : currentInput + number;
        }
        updateDisplay();
        flashDisplay();
    }

    function appendDecimal() {
        if (waitingForNewInput) {
            currentInput = '0.';
            waitingForNewInput = false;
        } else if (currentInput.indexOf('.') === -1) {
            currentInput += '.';
        }
        updateDisplay();
        flashDisplay();
    }

    function setOperation(op) {
        if (operation && !waitingForNewInput) {
            calculate();
        }
        
        previousInput = currentInput;
        operation = op;
        waitingForNewInput = true;
        
        // Visual feedback for operator buttons
        document.querySelectorAll('.btn-operator').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-op="${op}"]`).classList.add('active');
        
        updateDisplay();
    }

    function calculate() {
        if (!operation || !previousInput) return;
        
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        let result;
        
        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    alert('Cannot divide by zero!');
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }
        
        currentInput = result.toString();
        operation = null;
        previousInput = '';
        waitingForNewInput = true;
        
        // Remove active state from operators
        document.querySelectorAll('.btn-operator').forEach(btn => {
            btn.classList.remove('active');
        });
        
        updateDisplay();
        flashDisplay();
    }

    function clearAll() {
        currentInput = '0';
        previousInput = '';
        operation = null;
        waitingForNewInput = false;
        
        document.querySelectorAll('.btn-operator').forEach(btn => {
            btn.classList.remove('active');
        });
        
        updateDisplay();
        flashDisplay();
    }

    function clearEntry() {
        currentInput = '0';
        updateDisplay();
        flashDisplay();
    }

    function flashDisplay() {
        display.classList.add('flash');
        setTimeout(() => {
            display.classList.remove('flash');
        }, 500);
    }

    // Keyboard support
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        
        if (key >= '0' && key <= '9') {
            appendNumber(key);
        } else if (key === '.') {
            appendDecimal();
        } else if (key === '+' || key === '-' || key === '*' || key === '/') {
            setOperation(key);
        } else if (key === 'Enter' || key === '=') {
            event.preventDefault();
            calculate();
        } else if (key === 'Escape') {
            clearAll();
        } else if (key === 'Backspace') {
            clearEntry();
        }
    });
    // // Add some interactivity
    //     document.querySelector('.github').addEventListener('click', function() {
    //         this.innerHTML = 'Added! ✓';
    //         this.style.background = 'linear-gradient(135deg, #4caf50, #45a049)';
            
    //         setTimeout(() => {
    //             this.innerHTML = 'Add to Cart';
    //             this.style.background = 'linear-gradient(135deg, #ff6b35, #ff8c42)';
    //         }, 2000);
    //     });

    //     // Add hover effect to card
    //     document.querySelector('.product-card').addEventListener('mouseenter', function() {
    //         this.style.transform = 'translateY(-5px)';
    //         this.style.transition = 'transform 0.3s ease';
    //     });

    //     document.querySelector('.product-card').addEventListener('mouseleave', function() {
    //         this.style.transform = 'translateY(0)';
        // });

    // Initialize display
    updateDisplay();