import path from "path";
class PublicController {
    HelloApolo(_req, res) {
        const HelloApolo = path.join(__dirname, "..", "Templates", "Responses", "Response_Apolo.html");
        return res.status(200).sendFile(HelloApolo);
    }
}
export default PublicController;
//# sourceMappingURL=Public_Controllers.js.map