from src.app.file import File

if __name__ == "__main__":
    myfile = File()
    myfile.read_from_file()
    myfile.parse_xml()
    myfile.write_to_excel()