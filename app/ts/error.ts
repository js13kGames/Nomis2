namespace Engine {

    export class ErrorBox implements Engine.IRender, IGetClicked {
        lastTimestamp;
        width: number;
        buttons: Array<Button>;
        headingHeight: number;

        private errors: Array<string>;
        private message: string;
        

        constructor(public x: number, public y: number, public height: number, public color: string, private callback?: () => any) {
            this.errors = this.getErrors();
            this.message = this.errors[Math.floor(Math.random() * this.errors.length)];
            this.width = 200;
            this.headingHeight = 32;

            this.buttons = [
                new Button(x-12, y, " OK ", 20, '#000'),
                new Button(x+14, y-(height+ (this.headingHeight / 2)), "X", 20, '#000')
            ]

        }

        
        public render(context: CanvasRenderingContext2D, timestamp): void {
            // render the sprite
            let color1 = '#ccc', color2 = '#bbb', color3 = '#aac', txtColor = '#000';
            let btnColor = '#a8a8a8'
            let errorHeight = 12;
            let btnWidth = 50, btnHeight = 18, btnPad = 5;
            let boxPad = 10;
            let boxWidth = (this.width + btnWidth) + (boxPad * 2) + 200;

            let boxY = (this.y - this.height) - boxPad;
            let boxX = (this.x + btnWidth - (boxWidth)) - boxPad;


            Engine.Drawing.rect(context, boxX, boxY - this.headingHeight, boxWidth, this.headingHeight, true, color3)
            Engine.Drawing.text(context, "Unexpected error has occurred", boxX+5, boxY-5, 20);
            //outer bounding box
            Engine.Drawing.rect(context, boxX, boxY, boxWidth, this.height + btnHeight, true, color1);
            Engine.Drawing.rect(context, boxX, boxY - this.headingHeight, boxWidth, (this.height + btnHeight) + this.headingHeight, false, color2);

            //error message
            context.font = '24px Wawati SC';
            context.fillStyle = txtColor;
            Engine.Drawing.wrapText(context, this.message, boxX + boxPad, (boxY + errorHeight)+ boxPad, boxWidth -20, 24);

            let btnX = this.x - 20;
            let btnY = this.y - (btnHeight);
            //error button
            context.font = `${btnHeight}px Wawati SC`;

            Engine.Drawing.rect(context, btnX - btnPad, btnY - btnPad, btnWidth + (btnPad * 2), btnHeight + (btnPad * 2), true, btnColor);
            Engine.Drawing.rect(context, btnX - btnPad, btnY - btnPad, btnWidth + (btnPad * 2), btnHeight + (btnPad * 2), false, color2);
        
            this.buttons.forEach(function(b){
                b.render(context, timestamp);
            })
        }


        public checkCollision(x: number, y: number): boolean {
            var hasCollision = false;
            this.buttons.forEach(b => {
                if(b.checkCollision(x,y))
                    hasCollision = true;
            });
            return hasCollision;
        
        }

        public click(event: MouseEvent): void {
            if (this.callback != null) {
                this.callback();
            }
        }

        private getErrors(): Array<string> {
            return ["ID 10 T error.", "Disconnect between the keyboard and the seat.", "Your TPS Report failed to print.", "Object expected.", "Nomis2 is undefined.", "Unterminated string constant.", "Expected ')' or missing ) after argument list.", "Uncaught TypeError: undefined is not a function", "'this' does not contain a property for 'Game'", "'addClickHandler' is null", "true == 1 is true", "true === 'true' is false", "Uncaught ReferenceError: Invalid left-hand side in assignment", "Uncaught TypeError: Converting circular structure to JSON", "Unexpected token ;", "Uncaught exception: TypeError: JSON.stringify: Not an acyclic Object", "TypeError: cyclic object value, Circular reference in value argument not supported", "Uncaught SyntaxError: Unexpected token ILLEGAL", "Uncaught TypeError: Cannot read property 'glitch' of null", "Uncaught TypeError: Cannot read property 'fixit' of undefined", "Uncaught TypeError: Cannot set property 'monkey' of null", "Uncaught TypeError: Cannot set property 'poop' of undefined", "Uncaught RangeError: Maximum call stack size exceeded", "StackOverFlow: 0x0934503469906450620846", "Uncaught URIError: URI malformed", "XMLHttpRequest cannot load http://js13kgames.com/. No 'Access-Control-Allow-Origin' header is present on the requested resource", "Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at http://js13kgames.com/", "Uncaught exception: RangeError: Maximum recursion depth exceeded, too much recursion, Stack overflow", "TypeError: someVal is undefined", "Unable to set property 'goose' of undefined or null reference", "URIError: malformed URI sequence", "InvalidStateError: An attempt was made to use an object that is not, or is no longer, usable", "InvalidStateError, DOMException code 42", "To help protect your computer, OS has stopped working.", "The mapped network drive could not be created because the following error has occurred:  An extended error has occurred.", "Catastrophic failure.  Please continue.", "The flux capacitor has gone caput", "The dingo ate my baby!", "Your mouse has stopped working.  Click OK to Continue.", "The operation completed successfully.", "No error occurred.", "An error occurred while displaying the previous error.", "User error - Replace User", "This is not just a warning.", "NET_SendPacket ERROR:  NO ERROR", "You do not have permission to view errors about permissions", "Cannot delete 4242:  There is not enough free disk space.  Delete one or more files to free disk space, and then try again.", "Press the any key to return.", "Surprise!  Your Meeting Software Client has stopped working.", "It no worky."];
        }
    }
}