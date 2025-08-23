(function() {
    document.addEventListener('readystatechange', function (e) {
        if (e.target.readyState === 'complete') {
            console.log('document ready');
            var a = document.querySelector('script[id="alfinderScript"]').getAttribute('data-key');
            if (a) {
                init(a);
            }
        }
    });

    function init(a) {
        var xhr = new XMLHttpRequest();
        var url = 'http://127.0.0.1:8000/sets/' + a;

        xhr.open('POST', url);
        // xhr.withCredentials = true;
        // xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        // xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log('ok');
                    let r = JSON.parse(xhr.response)
                    if (r) {
                        console.log(r);
                        updateCss(r);
                        draw(a, r);
                    } else {
                        return undefined
                    }
                }
                else {
                    return undefined
                }
            }            
        };
        xhr.send();
    }

    function send(d) {
        var xhr = new XMLHttpRequest();
        var url = 'http://127.0.0.1:8000/data/record/' + d.meta.api_key;

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = async function() {
            if (xhr.readyState === 4) {
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    console.log('ok');
                    let res = await JSON.parse(xhr.response)
                    return res
                }
                else {
                    return undefined
                }
            }
        };
        xhr.send(JSON.stringify(d));
    }

    function draw(a, d) {
        var alfinder = document.createElement('div');
        alfinder.setAttribute('id', 'alfinder_set_' + d.set_id);

        var container = document.createElement('div');
        container.setAttribute('class', 'container');

        var btn = document.createElement('div');
        btn.setAttribute('class', 'alfinder_btn');
        btn.addEventListener('click', function(e) {
            this.classList.toggle('closed');
            content.classList.toggle('active');
            container.classList.toggle('active');
        });

        var content = document.createElement('div');
        content.setAttribute('class', 'content');

        var result = document.createElement('div');
        result.setAttribute('class', 'result');
        result.innerHTML = '<p>Thank You.</p>';

        var cls = document.createElement('div');
        cls.setAttribute('class', 'close');
        cls.innerHTML = `<i>`;
        cls.addEventListener('click', function(e) {
            btn.classList.toggle('closed');
            content.classList.toggle('active');
            container.classList.toggle('active');
        });

        var headline = document.createElement('p');
        headline.innerHTML = 'Select the answers that best applies to you.';
        headline.setAttribute('class', 'headline');

        container.appendChild(cls);
        content.appendChild(headline);

        var answers = {}

        d.questions.forEach(elem => {
            let el = document.createElement('div');
            el.setAttribute('class', 'alfinder_qa')

            let title = document.createElement('p');
            title.innerHTML = elem.body;

            let inputContainer = document.createElement('div');
            inputContainer.setAttribute('class', 'switch');

            let yes = document.createElement('input');
            yes.setAttribute("type", "radio");
            yes.setAttribute("name", "q" + elem.id);
            yes.setAttribute("id", "q" + elem.id +  "Yes");
            yes.addEventListener('click', function(e) {
                answers[elem.id] = 1
                
                e.target.parentElement.childNodes[1].setAttribute('checked', true);
                e.target.parentElement.childNodes[2].removeAttribute('checked');
            });
            let no = document.createElement('input');
            no.setAttribute("type", "radio");
            no.setAttribute("name", "q" + elem.id);
            no.setAttribute("id", "q" + elem.id +  "No");
            no.addEventListener('click', function(e) {
                answers[elem.id] = 0
                
                e.target.parentElement.childNodes[1].removeAttribute('checked');
                e.target.parentElement.childNodes[2].setAttribute('checked', true);
            });

            let label1 = document.createElement('label');
            label1.setAttribute('for', "q" + elem.id +  "Yes");
            label1.innerHTML = 'Yes';
            let label2 = document.createElement('label');
            label2.setAttribute('for', "q" + elem.id +  "No");
            label2.innerHTML = 'No';

            inputContainer.appendChild(label1);
            inputContainer.appendChild(label2);
            
            el.appendChild(title);
            el.appendChild(yes);
            el.appendChild(no);
            el.appendChild(inputContainer);
            content.appendChild(el);
        });

        var submit = document.createElement('button');
        submit.innerHTML = 'Submit';
        submit.addEventListener('click', function(e) {
            let dict = {}
            dict['info'] = {}
            dict['answers'] = answers;
            dict['meta'] = {
                'set_id': d.set_id,
                'api_key': a,
            }
            send(dict);
            content.classList.toggle('active');
            result.classList.toggle('active');
            
        });

        content.appendChild(submit);
        container.appendChild(content);
        container.appendChild(result);
        
        alfinder.appendChild(btn);
        alfinder.appendChild(container);
        document.body.appendChild(alfinder);
    }

    function updateCss(d) {
        var style_tag = document.createElement('style');

        style_tag.innerHTML += `
            #alfinder_set_` + d.set_id + ` {
                position:fixed;
                bottom:30px;
                right:30px;
                height:auto;
                z-index:9999;
            }
            #alfinder_set_` + d.set_id + ` .alfinder_btn {
                width: 75px;
                height: 75px;
                border-radius: 50px; 
                background-image: url(http://api.alfinder.com/static/Alfinder-Icon-1024x1024.png);
                background-repeat: no-repeat;
                background-position: center;
                background-size: cover;
                transition: all .2s ease-in-out;
            }
            #alfinder_set_` + d.set_id + ` .container {
                position: absolute;
                display: none;
                right: 0;
                bottom: 0;
            }
            #alfinder_set_` + d.set_id + ` .container .close {
                position: absolute;
                right: 15px;
                bottom: 435px;
                padding: 5px;
                cursor: pointer;
                z-index: 999;
            }
            #alfinder_set_` + d.set_id + ` .alfinder_btn.closed {
                display: none;
            }
            #alfinder_set_` + d.set_id + ` .content {
                position: absolute;
                display: none;
                bottom: 0;
                right: 0;
                margin: 0 auto;
                width: 400px;
                padding:17px;
                border-radius:20px;
                background-color:#FFF;
                box-shadow:0 2px 7px rgba(100, 100, 100, 0.4);
                background: #fff;
            }
            #alfinder_set_` + d.set_id + ` .result {
                display: none;
                margin: 0 auto;
                width: 400px;
                padding:17px;
                border-radius:20px;
                box-shadow:0 2px 7px rgba(100, 100, 100, 0.4);
                background: #fff;
            }
            #alfinder_set_` + d.set_id + ` .result.active {
                display: block;
            }
            #alfinder_set_` + d.set_id + ` .container.active {
                display: block;
            }
            #alfinder_set_` + d.set_id + ` .content.active {
                display: block;
            }
            #alfinder_set_` + d.set_id + ` .content {
                margin: 0 0 13px 0;
                font-size: 16px;
                font-weight: 400;
                color: #2e2e2e
            }
            #alfinder_set_` + d.set_id + ` .content .headline {
                font-weight: 400;
                font-size: 15px;
                color: #888;
            }
            #alfinder_set_` + d.set_id + ` .content .alfinder_qa {
                width: 100%;
                min-height :80px;
                margin-bottom: 14px;
            }
            #alfinder_set_` + d.set_id + ` .content .alfinder_qa p {
                margin:0 0 12px 0;
                margin-left:10px;
                font-weight:500;
                letter-spacing:0.5px;
                line-height:22px;
            }
            #alfinder_set_` + d.set_id + ` .content .alfinder_qa .switch {
            display: flex;
            justify-content: space-between;
            width: 380px;
            height: 40px;
            text-align: center;
            background: #fff;
            border-radius: 25px;
            -webkit-transition: all 0.2s ease;
            -moz-transition: all 0.2s ease;
            -o-transition: all 0.2s ease;
            -ms-transition: all 0.2s ease;
            transition: all 0.2s ease;
            }
            #alfinder_set_` + d.set_id + ` .content .alfinder_qa input[type=radio] {
            display: none;
            }
            #alfinder_set_` + d.set_id + ` .content .alfinder_qa .switch label {
            cursor: pointer;
            color: rgba(0,0,0,0.2);
            width: 180px;
            height: 40px;
            line-height: 40px;
            font-weight: 800;
            border-radius: 25px;
            box-shadow: 0 1px 4px rgba(110, 110, 110, 0.3);
            -webkit-transition: all 0.2s ease;
            -moz-transition: all 0.2s ease;
            -o-transition: all 0.2s ease;
            -ms-transition: all 0.2s ease;
            transition: all 0.2s ease;
            }
            #alfinder_set_` + d.set_id + ` .content .alfinder_qa label:hover {
                background: #DBD7EA;
            }
            #alfinder_set_` + d.set_id + ` .content button{
                cursor: pointer;
                width: 200px;
                margin: 13px 0 0 100px;
                padding: 11px 0;
                border: none;
                font-weight: 300;
                background-color: #181325;
                color: #fff;
                border-radius: 40px;
            }
        `

        d.questions.forEach(elem => {
            style_tag.innerHTML += `
                #q` + elem.id + `Yes:checked ~ .switch label[for=q` + elem.id + `Yes] {
                color: #fff;
                background: #3C2D69;
                }
                #q` + elem.id + `No:checked ~ .switch label[for=q` + elem.id + `No] {
                color: #fff;
                background: rgba(100, 20, 186, 0.4);
                }
            `
        })

        document.getElementsByTagName("head")[0].appendChild(style_tag);
    }
})();