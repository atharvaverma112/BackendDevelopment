
from datetime import datetime
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
import uvicorn

app = FastAPI()

templates = Jinja2Templates(directory="templates")

# Serve static files, including images
app.mount("/static", StaticFiles(directory="static"), name="static")


# Display current date and time
@app.get("/time", response_class=HTMLResponse)
def show_time(request: Request):
    now = datetime.now().strftime("%d-%m-%Y %H:%M:%S")

    return templates.TemplateResponse(
        request=request,
        name="time.html",
        context={"now": now}
    )


# Display an image using Jinja2
@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="image.html",
        context={}
    )


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
