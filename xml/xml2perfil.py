import xml.etree.ElementTree as ET

def create_svg_from_xml(xml_file):
    # Parse the XML file
    tree = ET.parse(xml_file)
    root = tree.getroot()
    namespaces = {'u': 'http://www.uniovi.es'}
    # Extract points (longitud and latitud within puntos)
    points = []
    x = 50
    for punto in root.findall('.//u:puntos/u:puntoFinal', namespaces):
        longitud = float(punto.find('u:longitudPunto', namespaces).text)
        altitud = float(punto.find('u:altitudPunto', namespaces).text)
        # Transform coordinates to a suitable SVG scale (simple scaling for demonstration)
        x = x+30
        y = 600-(altitud-200)
        points.append(f"{x},{y}")

    # Close the shape by connecting the last point to the first
    points.append(points[0])
    points_string = " \n".join(points)

    # Generate SVG content
    svg_content = f"""<svg viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg">
        <polyline points="{points_string}" style="fill:black;stroke:black;stroke-width:3" />
    </svg>"""

    # Write the SVG content to an SVG file
    output_file = 'xml\\perfil.svg'
    with open(output_file, 'w') as file:
        file.write(svg_content)

    print(f"SVG file created: {output_file}")

# Usage example
create_svg_from_xml('xml\\circuitoEsquema.xml')