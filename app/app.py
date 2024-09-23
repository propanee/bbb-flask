from flask import Flask, render_template, url_for

app = Flask(__name__)

@app.after_request
def add_header(response):
    # 这些头部信息会告诉浏览器每次都重新请求文件
    response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'
    return response

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/show_image')
def show_image():
    return render_template('index.html', image_file=url_for('static', filename='images/Blockchain Structure.gv.svg'))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)