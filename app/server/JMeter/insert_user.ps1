# Cargar el ensamblado de MySQL
Add-Type -Path "C:\Program Files (x86)\MySQL\MySQL Connector NET 9.2\MySql.Data.dll"

# Configuración de conexión
$server = "127.0.0.1"
$database = "dmusic"
$user = "root"
$password = "root"

# Cadena de conexión
$connectionString = "Server=$server;Database=$database;User Id=$user;Password=$password;"

# Crear conexión
$connection = New-Object MySql.Data.MySqlClient.MySqlConnection($connectionString)
$connection.Open()

# Leer el archivo CSV
$csvFilePath = "C:\Users\Tardes\Documents\OK\Proyectos\DMusic-WIP\app\server\JMeter\encrypt_users.csv"  # Cambia esto a la ruta de tu archivo CSV
$csvData = Import-Csv -Path $csvFilePath -Delimiter ','

# Ejecutar inserts
foreach ($linea in $csvData) {
    $query = "INSERT INTO users (full_name, email, pass, birthdate, gender) VALUES (@full_name, @email, @pass, @birthdate, @gender)"
    $command = New-Object MySql.Data.MySqlClient.MySqlCommand($query, $connection)
    
    $command.Parameters.AddWithValue("@full_name", $linea.full_name)
    $command.Parameters.AddWithValue("@email", $linea.email)
    $command.Parameters.AddWithValue("@pass", $linea.pass)
    $command.Parameters.AddWithValue("@birthdate", "2000-01-12")
    $command.Parameters.AddWithValue("@gender", "hombre")
    
    Write-Host "Insertando usuario$i..."
    $command.ExecuteNonQuery()
}

# Cerrar conexión
$connection.Close()
Write-Host "✅ Todos los usuarios insertados con éxito"