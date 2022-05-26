var createError = require("http-errors");
var express = require("express");
var config = require("config");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

var app = express();
app.use(cors());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const root = require('path').join(__dirname,'..', 'client', 'build')
app.use(express.static(root));

app.use(
    "/api/expenses",
    createProxyMiddleware({
      target: config.backendEndpoint.url,
      changeOrigin: true,
      pathRewrite: {
        ["^/api/expenses"]: "",
      },
      onProxyReq: async (proxyReq, req, res) => {
        proxyReq.setHeader("Content-Type", "application/json");
        proxyReq.setHeader("Authorization", req.cookies.accessToken);
        proxyReq.setHeader("Connection", "keep-alive");
        proxyReq.setHeader("Accept", "*/*");
      },
      onProxyRes(proxyRes, req, res) {
      },
      onError(err, req, res) {
        console.log("error", err);
        res.writeHead(500, {
          contentType: "text/plain",
        });
        res.end(err.toString());
      },
    })
  );  

app.get("/*", (req, res) => {
    res.sendFile('index.html', { root });
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
